// Property of dani.co

var STUN_SERVERS_L = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }, { urls: 'stun:stun1.l.google.com:19302' }] };
var SIGNAL_CH = 'webrtc-signal';

var visitorId = 'v-' + Math.random().toString(36).slice(2, 10);
var listenerPc = null;
var listenerChannel = null;
var broadcastWasActive = false;

async function initListener() {
  var active = await getBroadcastActivo();
  if (active) { joinBroadcast(); }

  supabaseClient.channel('broadcast-config-watch')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'config' }, function(payload) {
      if (!payload.new || payload.new.clave !== 'broadcast_activo') { return; }
      var isNowActive = payload.new.valor === 'true';
      if (isNowActive && !broadcastWasActive) { joinBroadcast(); }
      if (!isNowActive && broadcastWasActive) { leavebroadcast(); }
    })
    .subscribe();
}

function joinBroadcast() {
  broadcastWasActive = true;
  showBroadcastWidget(true);

  listenerChannel = supabaseClient.channel(SIGNAL_CH, { config: { broadcast: { self: false } } });

  listenerChannel.on('broadcast', { event: 'offer' }, async function(msg) {
    if (msg.payload.visitorId !== visitorId) { return; }
    try {
      listenerPc = new RTCPeerConnection(STUN_SERVERS_L);

      listenerPc.ontrack = function(e) {
        var audio = document.getElementById('broadcast-audio');
        if (!audio) { return; }
        audio.srcObject = e.streams[0];
        audio.play().catch(function() {
          var btn = document.getElementById('broadcast-unmute');
          if (btn) { btn.style.display = 'inline-block'; }
        });
      };

      listenerPc.onicecandidate = function(e) {
        if (!e.candidate) { return; }
        listenerChannel.send({ type: 'broadcast', event: 'ice-visitor', payload: { visitorId: visitorId, candidate: e.candidate.toJSON() } });
      };

      listenerPc.onconnectionstatechange = function() {
        var state = listenerPc.connectionState;
        var dot = document.getElementById('broadcast-dot');
        if (dot) { dot.className = (state === 'connected') ? 'broadcast-dot on' : 'broadcast-dot'; }
        if (state === 'failed' || state === 'disconnected') { leavebroadcast(); }
      };

      await listenerPc.setRemoteDescription(new RTCSessionDescription(msg.payload.sdp));
      var answer = await listenerPc.createAnswer();
      await listenerPc.setLocalDescription(answer);
      listenerChannel.send({ type: 'broadcast', event: 'answer', payload: { visitorId: visitorId, sdp: listenerPc.localDescription } });
    } catch (e) { console.error('listener offer err', e); }
  });

  listenerChannel.on('broadcast', { event: 'ice-admin' }, async function(msg) {
    if (msg.payload.visitorId !== visitorId || !listenerPc || !msg.payload.candidate) { return; }
    try { await listenerPc.addIceCandidate(new RTCIceCandidate(msg.payload.candidate)); } catch (e) { console.error('listener ice err', e); }
  });

  listenerChannel.on('broadcast', { event: 'broadcast-end' }, function() {
    leavebroadcast();
  });

  listenerChannel.subscribe(function(status) {
    if (status === 'SUBSCRIBED') {
      listenerChannel.send({ type: 'broadcast', event: 'visitor-join', payload: { visitorId: visitorId } });
    }
  });
}

function leavebroadcast() {
  broadcastWasActive = false;
  if (listenerPc) { listenerPc.close(); listenerPc = null; }
  if (listenerChannel) { supabaseClient.removeChannel(listenerChannel); listenerChannel = null; }
  showBroadcastWidget(false);
}

function showBroadcastWidget(show) {
  var widget = document.getElementById('broadcast-widget');
  if (!widget) { return; }
  if (show) {
    widget.classList.remove('hidden');
  } else {
    widget.classList.add('hidden');
    var audio = document.getElementById('broadcast-audio');
    if (audio) { audio.srcObject = null; }
  }
}
