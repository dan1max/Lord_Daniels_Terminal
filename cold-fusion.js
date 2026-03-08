// cold-fusion.js — Property of dani.co

(function() {

  // ── dialog lines ───────────────────────────────────────────
  var CORRECT_CODE = 'congratsyouwon';
  var DIALOG_LINES = [
    'Well, I am delighted to see you, old chum.',
    'It is good to see that, after all, someone did come. Chances were someone would show up. And here you are.',
  ];

  // ── state ──────────────────────────────────────────────────
  var activated      = false;
  var noiseRaf       = null;
  var noiseCanvas    = null;
  var noiseCtx       = null;
  var dialogLineIdx  = 0;
  var typingInterval = null;
  var typingDone     = false;

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

  // ── dissolve transition ────────────────────────────────────

  function dissolveToHouse() {
    var noSignalEl = document.getElementById('cf-nosignal');
    var revealedEl = document.getElementById('cf-revealed');
    var dialogEl   = document.getElementById('cf-dialog');

    if (!noSignalEl || !revealedEl) { return; }

    // Hide NO SIGNAL text instantly
    var noSignalText = document.getElementById('cf-nosignal-text');
    if (noSignalText) { noSignalText.style.visibility = 'hidden'; }
    var noSignalLines = noSignalEl.querySelector('.cf-nosignal-lines');
    if (noSignalLines) { noSignalLines.style.visibility = 'hidden'; }

    var start     = null;
    var duration  = 2200;
    var revealed  = false;

    stopNoise();

    function step(ts) {
      if (!start) { start = ts; }
      var elapsed  = ts - start;
      var progress = Math.min(elapsed / duration, 1);

      // Flicker phase (0–30%)
      if (progress < 0.3) {
        var flicker = (Math.random() > 0.5) ? 1.0 : 0.4;
        drawNoise(flicker);
      }
      // Dissolve phase (30–80%): noise fades, image fades in
      else if (progress < 0.8) {
        var t = (progress - 0.3) / 0.5;
        drawNoise(1 - t);
        revealedEl.style.opacity = t.toString();
        revealedEl.classList.remove('hidden');
      }
      // Final phase (80–100%)
      else {
        drawNoise(0);
        revealedEl.style.opacity = '1';
        noSignalEl.style.display = 'none';
        if (!revealed) {
          revealed = true;
          if (dialogEl) {
            dialogEl.classList.remove('hidden');
            startDialogLine(0);
          }
        }
      }

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  // ── one-line-at-a-time dialog ──────────────────────────────

  function startDialogLine(idx) {
    dialogLineIdx = idx;
    typingDone    = false;

    var textEl    = document.getElementById('cf-dialog-text');
    var continueBtn = document.getElementById('cf-continue');
    if (!textEl) { return; }

    // Clear previous line
    textEl.innerHTML = '';
    if (continueBtn) { continueBtn.style.visibility = 'hidden'; }

    var line = DIALOG_LINES[idx];
    if (!line) { return; }

    // Type out the line
    var p = document.createElement('div');
    p.className = 'cf-dialog-line';
    textEl.appendChild(p);

    var charIdx = 0;
    if (typingInterval) { clearInterval(typingInterval); }

    typingInterval = setInterval(function() {
      p.textContent += line[charIdx];
      charIdx++;
      if (charIdx >= line.length) {
        clearInterval(typingInterval);
        typingInterval = null;
        typingDone = true;
        // Show continue button only if there's a next line
        if (continueBtn && idx < DIALOG_LINES.length - 1) {
          continueBtn.style.visibility = 'visible';
        }
      }
    }, 28);
  }

  function handleContinue() {
    // If still typing, skip to end of current line instantly
    if (!typingDone) {
      if (typingInterval) { clearInterval(typingInterval); typingInterval = null; }
      var textEl = document.getElementById('cf-dialog-text');
      var continueBtn = document.getElementById('cf-continue');
      if (textEl) {
        var p = textEl.querySelector('.cf-dialog-line');
        if (p) { p.textContent = DIALOG_LINES[dialogLineIdx]; }
      }
      typingDone = true;
      if (continueBtn && dialogLineIdx < DIALOG_LINES.length - 1) {
        continueBtn.style.visibility = 'visible';
      }
      return;
    }

    // Advance to next line
    var nextIdx = dialogLineIdx + 1;
    if (nextIdx < DIALOG_LINES.length) {
      startDialogLine(nextIdx);
    }
  }

  // ── activation logic ───────────────────────────────────────

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
      var nosignal = document.getElementById('cf-nosignal-text');
      if (nosignal) {
        nosignal.style.color = 'var(--red-alert)';
        setTimeout(function() { nosignal.style.color = ''; }, 400);
      }
      return;
    }

    // ✓ Correct code
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

    var submitBtn   = document.getElementById('cf-submit');
    var input       = document.getElementById('cf-code-input');
    var continueBtn = document.getElementById('cf-continue');

    if (submitBtn) {
      submitBtn.addEventListener('click', handleActivate);
    }
    if (input) {
      input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') { e.preventDefault(); handleActivate(); }
      });
    }
    if (continueBtn) {
      continueBtn.addEventListener('click', handleContinue);
    }
  }

  window.initColdFusion = initColdFusion;

  window.onColdFusionVisible = function() {
    if (!noiseRaf && !activated) {
      resizeNoise();
      loopNoise();
    }
  };

})();
