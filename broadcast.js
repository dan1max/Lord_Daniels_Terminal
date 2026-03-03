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

  // 1. High-pass: strip everything below 280Hz (no warmth, no body)
  var hipass = audioCtx.createBiquadFilter();
  hipass.type = 'highpass';
  hipass.frequency.value = 200;
  hipass.Q.value = 0.8;

  // 2. Low-pass: hard ceiling at 3kHz — old CRT speaker can't reproduce highs
  var lopass = audioCtx.createBiquadFilter();
  lopass.type = 'lowpass';
  lopass.frequency.value = 3800;
  lopass.Q.value = 0.7;

  // 3. Bandpass A: boost boxy midrange around 800Hz (the "talking through a metal box" quality)
  var bandMid = audioCtx.createBiquadFilter();
  bandMid.type = 'peaking';
  bandMid.frequency.value = 800;
  bandMid.Q.value = 1.2;
  bandMid.gain.value = 4;

  // 4. Bandpass B: slight presence boost around 1.8kHz for intelligibility
  var bandPres = audioCtx.createBiquadFilter();
  bandPres.type = 'peaking';
  bandPres.frequency.value = 1800;
  bandPres.Q.value = 1.0;
  bandPres.gain.value = 3;

  // 5. Heavy distortion/saturation — Mr House has real grit
  var distortion = audioCtx.createWaveShaper();
  distortion.curve = makeDistortionCurve(40);
  distortion.oversample = '4x';

  // 6. Speaker box resonance: very short feedback delay (2.5ms) simulates
  //    sound bouncing inside a small metal enclosure
  var delayNode = audioCtx.createDelay();
  delayNode.delayTime.value = 0.0025;
  var delayFeedback = audioCtx.createGain();
  delayFeedback.gain.value = 0.10;
  var delayMix = audioCtx.createGain();
  delayMix.gain.value = 0.12;

  // 7. Compressor: heavy limiting, like a broadcast compander
  var compressor = audioCtx.createDynamicsCompressor();
  compressor.threshold.value = -22;
  compressor.knee.value = 4;
  compressor.ratio.value = 6;
  compressor.attack.value = 0.001;
  compressor.release.value = 0.08;

  // 8. Output gain
  var gain = audioCtx.createGain();
  gain.gain.value = 1.6;

  var dest = audioCtx.createMediaStreamDestination();

  // Main chain: source → hipass → lopass → bandMid → bandPres → distortion → compressor → gain
  source.connect(hipass);
  hipass.connect(lopass);
  lopass.connect(bandMid);
  bandMid.connect(bandPres);
  bandPres.connect(distortion);
  distortion.connect(compressor);
  compressor.connect(gain);

  // Delay feedback loop (box resonance) tapped after compressor
  compressor.connect(delayNode);
  delayNode.connect(delayFeedback);
  delayFeedback.connect(delayNode);
  delayNode.connect(delayMix);
  delayMix.connect(gain);

  gain.connect(dest);
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
