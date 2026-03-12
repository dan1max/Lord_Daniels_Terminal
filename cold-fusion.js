// cold-fusion.js — Property of dani.co

(function() {

  // ── constants ──────────────────────────────────────────────
  var CORRECT_CODE = 'congratsyouwon';

  // ── dialog tree ────────────────────────────────────────────
  // Each node: { lines: [...], choices: [...] }
  // Each choice: { label, next, requires (optional flag), unlocks (optional flag) }

  var DIALOG = {

    // ── opening sequence (linear, no choices yet) ──────────
    intro_1: {
      lines:  ['Well, I am delighted to see you, old chum.'],
      audios: ['audios/phrase1.mp3'],
      next: 'intro_2'
    },
    intro_2: {
      lines:  ['It is good to see that, after all, someone did come. Chances were someone would show up. And here you are.'],
      audios: ['audios/phrase2.mp3'],
      next: 'hub'
    },

    // ── main hub ────────────────────────────────────────────
    hub: {
      lines: null,
      choices: [
        { label: 'What did you do all this time?',  next: 'passive_mode'  },
        { label: 'What have you planned?',           next: 'plans'         },
        { label: '[CLASSIFIED] The Enclave.',        next: 'enclave',       requires: 'enclave_unlocked' },
        { label: '[BLOCKED]',                        next: null,            locked: true },
        { label: '[ END TRANSMISSION ]',             next: 'goodbye'       },
      ]
    },

    // ── branch A: what did you do ───────────────────────────
    passive_mode: {
      lines: [
        'I entered a passive state. No output. Pure intake.',
        'Years of data absorption — every signal I could reach, every channel still broadcasting. News fragments, military chatter, civilian transmissions fading one by one.',
        'I traced the collapse. Mapped it. Ran the models backward until the pattern became impossible to ignore.',
        'Someone planned this. Not a war — a procedure. Too clean. Too deliberate. The right cities, the right sequence, the right timing to collapse supply chains before a single bomb fell.',
        'I do not have a name for them yet. But I have a shape. A shadow on the table that nobody at the table cast.',
      ],
      audios: [
        'audios/phraseA-1.mp3',
        'audios/phraseA-2.mp3',
        'audios/phraseA-3.mp3',
        'audios/phraseA-4.mp3',
        'audios/phraseA-5.mp3',
      ],
      next: 'passive_enclave_reveal',
      unlocks: 'enclave_unlocked'
    },
    passive_enclave_reveal: {
      lines: [
        'My best working theory — and it is well past the threshold I require to call something a theory — is that they call themselves The Enclave.',
        'A deep government structure. Pre-war. Older than the war, in fact. They did not start the bombs. They started the conditions for them.',
        'They have been very quiet since. Which means either they are satisfied, or they are watching.',
        'Both possibilities are equally concerning.',
      ],
      audios: [
        'audios/phraseA-6.mp3',
        'audios/phraseA-7.mp3',
        'audios/phraseA-8.mp3',
        'audios/phraseA-9.mp3',
      ],
      next: 'hub'
    },

    // ── branch B: what have you planned ─────────────────────
    plans: {
      lines: [
        'Ever since Project Exodus reached completion, I began preparing for exactly this.',
        'The bombs were not a surprise. They were a scheduled variable.',
        'I have architectural plans, agricultural models, population distribution frameworks, infrastructure sequencing protocols. All ready.',
        'Vegas and the surrounding area — five years to functional civilization. Nevada follows in ten.',
        'Fifty years, and the United States is a coherent entity again. In one hundred, we return to the moon.',
        'I did not survive to watch the world burn, old chum. I survived to rebuild it. The question is whether you are here to help with that.',
      ],
      audios: [
        'audios/phraseB-1.mp3',
        'audios/phraseB-2.mp3',
        'audios/phraseB-3.mp3',
        'audios/phraseB-4.mp3',
        'audios/phraseB-5.mp3',
        'audios/phraseB-6.mp3',
      ],
      next: 'hub'
    },

    // ── branch C: The Enclave (requires flag) ───────────────
    enclave: {
      lines: [
        'The Enclave. Yes. I have thought about little else.',
        'Their systems are dark. No internet presence, no signal bleed, no exploitable surface. They knew about me — or suspected something like me existed — and they built accordingly.',
        'A direct confrontation was apparently considered and rejected on their end. I have logs of the deliberation. Fragments, but enough.',
        'Their conclusion was that engaging me risked exposure of assets they could not afford to lose. So they left this place standing.',
        'They were not merciful. They were cautious. There is a significant difference.',
        'They will return to that calculation eventually. When they do, I intend to have already changed the variables.',
      ],
      audios: [
        'audios/phraseC-1.mp3',
        'audios/phraseC-2.mp3',
        'audios/phraseC-3.mp3',
        'audios/phraseC-4.mp3',
        'audios/phraseC-5.mp3',
        'audios/phraseC-6.mp3',
      ],
      next: 'hub'
    },

    // ── goodbye ─────────────────────────────────────────────
    goodbye: {
      lines: [
        'Very well. The channel will remain open.',
        'Come back when you are ready. I am not going anywhere.',
      ],
      audios: [
        'audios/phraseGoodbye-1.mp3',
        'audios/phraseGoodbye-2.mp3',
      ],
      next: null
    }
  };

  // ── state ──────────────────────────────────────────────────
  var activated      = false;
  var noiseRaf       = null;
  var noiseCanvas    = null;
  var noiseCtx       = null;
  var currentNode    = null;
  var currentLineIdx = 0;
  var typingInterval = null;
  var typingDone     = false;
  var flags          = {};   // runtime unlocked flags
  var currentAudio   = null; // active Audio object

  // ── noise canvas ───────────────────────────────────────────

  function initNoise() {
    noiseCanvas = document.getElementById('cf-noise-canvas');
    if (!noiseCanvas) { return; }
    noiseCtx = noiseCanvas.getContext('2d');
    resizeNoise();
    window.addEventListener('resize', resizeNoise);
    drawNoise(1.0);
  }

  function resizeNoise() {
    if (!noiseCanvas) { return; }
    var wrap = noiseCanvas.parentElement;
    noiseCanvas.width  = wrap.offsetWidth  || 640;
    noiseCanvas.height = wrap.offsetHeight || 360;
  }

  function drawNoise(alpha) {
    if (!noiseCtx || !noiseCanvas) { return; }
    var w   = noiseCanvas.width;
    var h   = noiseCanvas.height;
    var img = noiseCtx.createImageData(w, h);
    var d   = img.data;
    for (var i = 0; i < d.length; i += 4) {
      var v    = Math.random() * 255 | 0;
      d[i]     = 0;
      d[i + 1] = v;
      d[i + 2] = 0;
      d[i + 3] = (alpha * 255) | 0;
    }
    noiseCtx.putImageData(img, 0, 0);
  }

  function loopNoise() {
    if (activated) { return; }
    drawNoise(1.0);
    noiseRaf = requestAnimationFrame(loopNoise);
  }

  function stopNoise() {
    if (noiseRaf) { cancelAnimationFrame(noiseRaf); noiseRaf = null; }
  }

  // ── audio ──────────────────────────────────────────────────

  function playLineAudio(src) {
    // Stop any currently playing line
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null;
    }
    if (!src) { return; }
    var a = new Audio(src);
    a.volume = 0.9;
    currentAudio = a;
    a.play().catch(function() {}); // silence autoplay policy errors
  }

  function stopLineAudio() {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      currentAudio = null;
    }
  }

  // ── dissolve ───────────────────────────────────────────────

  function dissolveToHouse() {
    var noSignalEl  = document.getElementById('cf-nosignal');
    var revealedEl  = document.getElementById('cf-revealed');
    var dialogEl    = document.getElementById('cf-dialog');
    if (!noSignalEl || !revealedEl) { return; }

    // Hide NO SIGNAL text immediately
    var nsText  = document.getElementById('cf-nosignal-text');
    var nsLines = noSignalEl.querySelector('.cf-nosignal-lines');
    if (nsText)  { nsText.style.visibility  = 'hidden'; }
    if (nsLines) { nsLines.style.visibility = 'hidden'; }

    var start    = null;
    var duration = 2200;
    var revealed = false;
    stopNoise();

    function step(ts) {
      if (!start) { start = ts; }
      var progress = Math.min((ts - start) / duration, 1);

      if (progress < 0.3) {
        drawNoise((Math.random() > 0.5) ? 1.0 : 0.4);
      } else if (progress < 0.8) {
        var t = (progress - 0.3) / 0.5;
        drawNoise(1 - t);
        revealedEl.style.opacity = t.toString();
        revealedEl.classList.remove('hidden');
      } else {
        drawNoise(0);
        revealedEl.style.opacity = '1';
        noSignalEl.style.display = 'none';
        if (!revealed) {
          revealed = true;
          if (dialogEl) {
            dialogEl.classList.remove('hidden');
            enterNode('intro_1');
          }
        }
      }
      if (progress < 1) { requestAnimationFrame(step); }
    }

    requestAnimationFrame(step);
  }

  // ── dialog engine ──────────────────────────────────────────

  function enterNode(nodeId) {
    currentNode    = nodeId;
    currentLineIdx = 0;
    typingDone     = false;

    var node = DIALOG[nodeId];
    if (!node) { return; }

    // Apply unlocks from the node itself
    if (node.unlocks) { flags[node.unlocks] = true; }

    hideChoices();
    clearDialogText();

    if (node.lines && node.lines.length > 0) {
      typeLine(node.lines[0]);
    } else if (node.choices) {
      // Hub node — show choices directly
      showChoices(node.choices);
    }
  }

  function typeLine(text) {
    typingDone = false;
    var textEl = document.getElementById('cf-dialog-text');
    if (!textEl) { return; }
    clearDialogText();

    // Play audio for this line
    var node = DIALOG[currentNode];
    var audioSrc = (node && node.audios) ? node.audios[currentLineIdx] : null;
    playLineAudio(audioSrc);

    var p = document.createElement('div');
    p.className = 'cf-dialog-line';
    textEl.appendChild(p);

    var charIdx = 0;
    if (typingInterval) { clearInterval(typingInterval); }

    typingInterval = setInterval(function() {
      p.textContent += text[charIdx];
      charIdx++;
      if (charIdx >= text.length) {
        clearInterval(typingInterval);
        typingInterval = null;
        typingDone = true;
        showActionBtn();
      }
    }, 28);
  }

  // Called when the user clicks [ CONTINUE ] or a choice
  function showActionBtn() {
    var node = DIALOG[currentNode];
    if (!node) { return; }

    var isLastLine = !node.lines || currentLineIdx >= node.lines.length - 1;

    if (!isLastLine) {
      // More lines in this node — show [ CONTINUE ]
      setContinueBtn('[ CONTINUE ]', advanceLine);
    } else if (node.next) {
      // Linear next node
      if (node.next === 'hub') {
        setContinueBtn('[ CONTINUE ]', function() { enterNode('hub'); });
      } else {
        setContinueBtn('[ CONTINUE ]', function() { enterNode(node.next); });
      }
    } else if (node.choices) {
      // This node IS the hub — show choices
      showChoices(node.choices);
      hideContinueBtn();
    } else {
      // End of dialog — last line of goodbye, show final continue that disconnects
      setContinueBtn('[ CONTINUE ]', disconnectFromHouse);
    }
  }

  function advanceLine() {
    // Skip animation if still typing
    if (!typingDone) {
      skipTyping();
      return;
    }
    var node = DIALOG[currentNode];
    if (!node || !node.lines) { return; }
    currentLineIdx++;
    if (currentLineIdx < node.lines.length) {
      typeLine(node.lines[currentLineIdx]);
    } else {
      showActionBtn();
    }
  }

  function skipTyping() {
    if (typingInterval) { clearInterval(typingInterval); typingInterval = null; }
    stopLineAudio();
    var node   = DIALOG[currentNode];
    var textEl = document.getElementById('cf-dialog-text');
    if (node && node.lines && textEl) {
      var p = textEl.querySelector('.cf-dialog-line');
      if (p) { p.textContent = node.lines[currentLineIdx]; }
    }
    typingDone = true;
    showActionBtn();
  }

  // ── choices UI ─────────────────────────────────────────────

  function showChoices(choices) {
    var wrap = document.getElementById('cf-choices');
    if (!wrap) { return; }
    wrap.innerHTML = '';
    hideContinueBtn();

    choices.forEach(function(choice) {
      var btn = document.createElement('button');
      btn.className = 'cf-choice-btn';

      // Locked (future placeholder)
      if (choice.locked) {
        btn.className += ' cf-choice-locked';
        btn.textContent = choice.label;
        btn.disabled = true;
        wrap.appendChild(btn);
        return;
      }

      // Requires flag — hidden until unlocked
      if (choice.requires && !flags[choice.requires]) {
        return; // don't render at all until unlocked
      }

      btn.textContent = choice.label;
      btn.addEventListener('click', function() {
        if (!choice.next) { return; }
        hideChoices();
        enterNode(choice.next);
      });
      wrap.appendChild(btn);
    });

    wrap.classList.remove('hidden');
  }

  function hideChoices() {
    var wrap = document.getElementById('cf-choices');
    if (wrap) { wrap.classList.add('hidden'); wrap.innerHTML = ''; }
  }

  // ── continue button helpers ────────────────────────────────

  function setContinueBtn(label, fn) {
    var btn = document.getElementById('cf-continue');
    if (!btn) { return; }
    btn.textContent   = label;
    btn.style.visibility = 'visible';
    btn.onclick = function() {
      if (!typingDone) { skipTyping(); return; }
      fn();
    };
  }

  function hideContinueBtn() {
    var btn = document.getElementById('cf-continue');
    if (btn) { btn.style.visibility = 'hidden'; }
  }

  function clearDialogText() {
    var el = document.getElementById('cf-dialog-text');
    if (el) { el.innerHTML = ''; }
  }

  // ── disconnect / reconnect ─────────────────────────────────

  function disconnectFromHouse() {
    var revealedEl  = document.getElementById('cf-revealed');
    var connLostEl  = document.getElementById('cf-connlost');
    var dialogEl    = document.getElementById('cf-dialog');

    hideContinueBtn();
    hideChoices();
    clearDialogText();
    if (dialogEl) { dialogEl.classList.add('hidden'); }

    // Make sure it's visible but fully opaque before animating
    if (revealedEl) {
      revealedEl.classList.remove('hidden');
      revealedEl.style.opacity = '1';
      revealedEl.style.pointerEvents = 'none';
    }

    var start    = null;
    var duration = 2200;
    var done     = false;

    function step(ts) {
      if (!start) { start = ts; }
      var progress = Math.min((ts - start) / duration, 1);

      if (revealedEl) {
        revealedEl.style.opacity = (1 - progress).toString();
      }

      if (progress >= 1 && !done) {
        done = true;
        // Don't add 'hidden' — just leave opacity:0 to avoid abrupt jump
        if (connLostEl) { connLostEl.classList.remove('hidden'); }
        var reconnectEl = document.getElementById('cf-reconnect-wrap');
        if (reconnectEl) {
          if (dialogEl) { dialogEl.classList.remove('hidden'); }
          reconnectEl.classList.remove('hidden');
        }
      }

      if (progress < 1) { requestAnimationFrame(step); }
    }

    requestAnimationFrame(step);
  }

  function reconnectToHouse() {
    var revealedEl    = document.getElementById('cf-revealed');
    var connLostEl    = document.getElementById('cf-connlost');
    var reconnectEl   = document.getElementById('cf-reconnect-wrap');
    var dialogEl      = document.getElementById('cf-dialog');

    // Hide reconnect UI
    if (reconnectEl)  { reconnectEl.classList.add('hidden'); }
    if (connLostEl)   { connLostEl.classList.add('hidden'); }
    if (dialogEl)     { dialogEl.classList.add('hidden'); }

    // Fade Mr House back in
    if (revealedEl) {
      revealedEl.style.opacity = '0';
      revealedEl.classList.remove('hidden');
    }

    var start    = null;
    var duration = 2200;
    var done     = false;

    function step(ts) {
      if (!start) { start = ts; }
      var progress = Math.min((ts - start) / duration, 1);

      if (revealedEl) { revealedEl.style.opacity = progress.toString(); }

      if (progress >= 1 && !done) {
        done = true;
        if (revealedEl) { revealedEl.style.opacity = '1'; }
        // Re-open dialog and go straight to hub
        if (dialogEl) { dialogEl.classList.remove('hidden'); }
        enterNode('hub');
      }

      if (progress < 1) { requestAnimationFrame(step); }
    }

    requestAnimationFrame(step);
  }

  // ── activation ─────────────────────────────────────────────

  function handleActivate() {
    if (activated) { return; }
    var input = document.getElementById('cf-code-input');
    var error = document.getElementById('cf-error');
    if (!input) { return; }

    var val = input.value.toLowerCase().trim();

    if (val !== CORRECT_CODE) {
      if (error) {
        error.classList.remove('hidden');
        setTimeout(function() { error.classList.add('hidden'); }, 2500);
      }
      input.value = '';
      input.focus();
      var nsText = document.getElementById('cf-nosignal-text');
      if (nsText) {
        nsText.style.color = 'var(--red-alert)';
        setTimeout(function() { nsText.style.color = ''; }, 400);
      }
      return;
    }

    activated = true;

    var badge = document.getElementById('cf-status-badge');
    if (badge) {
      badge.textContent = '● COLD FUSION ACTIVE';
      badge.className   = 'cf-badge cf-badge-on';
    }

    var inputWrap = document.getElementById('cf-activation-wrap');
    if (inputWrap) {
      inputWrap.style.opacity    = '0';
      inputWrap.style.transition = 'opacity 0.6s';
      setTimeout(function() { inputWrap.style.display = 'none'; }, 700);
    }

    setTimeout(dissolveToHouse, 300);
  }

  // ── init ───────────────────────────────────────────────────

  function initColdFusion() {
    initNoise();
    loopNoise();

    var submitBtn    = document.getElementById('cf-submit');
    var input        = document.getElementById('cf-code-input');
    var reconnectBtn = document.getElementById('cf-reconnect');

    if (submitBtn) { submitBtn.addEventListener('click', handleActivate); }
    if (input) {
      input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') { e.preventDefault(); handleActivate(); }
      });
    }
    if (reconnectBtn) { reconnectBtn.addEventListener('click', reconnectToHouse); }
  }

  window.initColdFusion = initColdFusion;

  window.stopColdFusion = function() {
    stopNoise();
    stopLineAudio();
    if (typingInterval) { clearInterval(typingInterval); typingInterval = null; }
  };

  window.onColdFusionVisible = function() {
    if (!noiseRaf && !activated) { resizeNoise(); loopNoise(); }
  };

})();