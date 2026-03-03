// Property of dani.co

var STUN_SERVERS = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }, { urls: 'stun:stun1.l.google.com:19302' }] };
var SIGNAL_CHANNEL = 'webrtc-signal';

var broadcastActive = false;
var micStream = null;
var peers = {};
var signalChannel = null;

async function initBroadcastAdmin() {
  var active = await getBroadcastActivo();
  renderBroadcastUI(active);

  document.getElementById('btn-broadcast').addEventListener('click', async function() {
    if (!broadcastActive) {
      await startBroadcast();
    } else {
      await stopBroadcast();
    }
  });
}

async function startBroadcast() {
  try {
    micStream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
  } catch (e) {
    showAlert('> MICROPHONE ACCESS DENIED: ' + e.message, 'error');
    return;
  }

  await setBroadcastActivo(true);
  broadcastActive = true;
  renderBroadcastUI(true);

  signalChannel = supabaseClient.channel(SIGNAL_CHANNEL, { config: { broadcast: { self: false } } });

  signalChannel.on('broadcast', { event: 'visitor-join' }, async function(msg) {
    var vid = msg.payload.visitorId;
    if (peers[vid]) { return; }
    await createPeerForVisitor(vid);
  });

  signalChannel.on('broadcast', { event: 'answer' }, async function(msg) {
    var vid = msg.payload.visitorId;
    var pc = peers[vid];
    if (!pc) { return; }
    try {
      await pc.setRemoteDescription(new RTCSessionDescription(msg.payload.sdp));
    } catch (e) { console.error('answer err', e); }
  });

  signalChannel.on('broadcast', { event: 'ice-visitor' }, async function(msg) {
    var vid = msg.payload.visitorId;
    var pc = peers[vid];
    if (!pc || !msg.payload.candidate) { return; }
    try {
      await pc.addIceCandidate(new RTCIceCandidate(msg.payload.candidate));
    } catch (e) { console.error('ice err', e); }
  });

  signalChannel.subscribe(function(status) {
    if (status === 'SUBSCRIBED') {
      signalChannel.send({ type: 'broadcast', event: 'broadcast-start', payload: {} });
    }
  });

  showAlert('> BROADCAST ACTIVE — WAITING FOR LISTENERS');
}

async function createPeerForVisitor(vid) {
  var pc = new RTCPeerConnection(STUN_SERVERS);
  peers[vid] = pc;

  micStream.getTracks().forEach(function(track) { pc.addTrack(track, micStream); });

  pc.onicecandidate = function(e) {
    if (!e.candidate) { return; }
    signalChannel.send({ type: 'broadcast', event: 'ice-admin', payload: { visitorId: vid, candidate: e.candidate.toJSON() } });
  };

  pc.onconnectionstatechange = function() {
    if (pc.connectionState === 'disconnected' || pc.connectionState === 'failed') {
      pc.close();
      delete peers[vid];
      updateListenerCount();
    }
  };

  try {
    var offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    signalChannel.send({ type: 'broadcast', event: 'offer', payload: { visitorId: vid, sdp: pc.localDescription } });
    updateListenerCount();
  } catch (e) { console.error('offer err', e); }
}

async function stopBroadcast() {
  if (signalChannel) {
    signalChannel.send({ type: 'broadcast', event: 'broadcast-end', payload: {} });
    supabaseClient.removeChannel(signalChannel);
    signalChannel = null;
  }
  Object.values(peers).forEach(function(pc) { pc.close(); });
  peers = {};
  if (micStream) { micStream.getTracks().forEach(function(t) { t.stop(); }); micStream = null; }
  await setBroadcastActivo(false);
  broadcastActive = false;
  renderBroadcastUI(false);
  showAlert('> BROADCAST STOPPED');
}

function updateListenerCount() {
  var el = document.getElementById('broadcast-listeners');
  if (el) { el.textContent = Object.keys(peers).length + ' LISTENER(S) CONNECTED'; }
}

function renderBroadcastUI(active) {
  var btn   = document.getElementById('btn-broadcast');
  var label = document.getElementById('broadcast-label');
  var info  = document.getElementById('broadcast-listeners');
  if (!btn) { return; }

  if (active) {
    btn.textContent = '[ STOP BROADCAST ]';
    btn.className = 'toggle-btn-off';
    if (label) { label.textContent = '● BROADCAST ACTIVE — AUDIO LIVE'; label.className = 'chat-toggle-status on'; }
    if (info)  { info.style.display = 'block'; }
  } else {
    btn.textContent = '[ START BROADCAST ]';
    btn.className = 'toggle-btn-on';
    if (label) { label.textContent = 'BROADCAST OFFLINE'; label.className = 'chat-toggle-status off'; }
    if (info)  { info.textContent = ''; info.style.display = 'none'; }
  }
}
