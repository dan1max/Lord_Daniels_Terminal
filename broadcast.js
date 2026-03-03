// Property of dani.co

var STUN_SERVERS = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }, { urls: 'stun:stun1.l.google.com:19302' }] };
var SIGNAL_CHANNEL = 'webrtc-signal';

var broadcastActive = false;
var micStream = null;
var radioStream = null;
var audioCtx = null;
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

  radioStream = applyRadioEffect(micStream);
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

  var streamToSend = radioStream || micStream;
  streamToSend.getTracks().forEach(function(track) { pc.addTrack(track, streamToSend); });

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
  if (radioStream) { radioStream.getTracks().forEach(function(t) { t.stop(); }); radioStream = null; }
  if (audioCtx) { audioCtx.close(); audioCtx = null; }
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

function applyRadioEffect(stream) {
  audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  var source = audioCtx.createMediaStreamSource(stream);

  // Bandpass: narrows to voice-band frequencies (300Hz - 3.4kHz) like a phone/radio
  var bandpass = audioCtx.createBiquadFilter();
  bandpass.type = 'bandpass';
  bandpass.frequency.value = 1800;
  bandpass.Q.value = 0.6;

  // High-pass: cuts low rumble below ~300Hz
  var hipass = audioCtx.createBiquadFilter();
  hipass.type = 'highpass';
  hipass.frequency.value = 300;

  // Waveshaper: soft distortion/saturation
  var distortion = audioCtx.createWaveShaper();
  distortion.curve = makeDistortionCurve(60);
  distortion.oversample = '4x';

  // Compressor: evens out volume like a radio compander
  var compressor = audioCtx.createDynamicsCompressor();
  compressor.threshold.value = -24;
  compressor.knee.value = 8;
  compressor.ratio.value = 6;
  compressor.attack.value = 0.003;
  compressor.release.value = 0.1;

  // Gain: compensate for level loss
  var gain = audioCtx.createGain();
  gain.gain.value = 1.8;

  // Chain: source → hipass → bandpass → distortion → compressor → gain → dest
  source.connect(hipass);
  hipass.connect(bandpass);
  bandpass.connect(distortion);
  distortion.connect(compressor);
  compressor.connect(gain);
  var dest = gain.connect(audioCtx.createMediaStreamDestination());
  return dest.stream;
}

function makeDistortionCurve(amount) {
  var samples = 256;
  var curve = new Float32Array(samples);
  for (var i = 0; i < samples; i++) {
    var x = (i * 2) / samples - 1;
    curve[i] = ((Math.PI + amount) * x) / (Math.PI + amount * Math.abs(x));
  }
  return curve;
}
