// Property of dani.co

var FS = {
  type: 'dir',
  children: {
    'README.txt': {
      type: 'file',
      content: [
        'DANCO INDUSTRIES — INTERNAL TERMINAL v4.2.1',
        '============================================',
        'STATUS: OPERATIONAL',
        'ACCESS LEVEL: PUBLIC',
        '',
        'This terminal is part of the DanCo Industries distributed',
        'infrastructure network. Some directories require clearance.',
        '',
        "Type 'help' for available commands.",
      ].join('\n')
    },
    'public': {
      type: 'dir',
      children: {
        'about_danco.txt': {
          type: 'file',
          content: [
            'DANCO INDUSTRIES — COMPANY PROFILE',
            '===================================',
            'Founded:      2019',
            'CEO:          Lord Daniel Hargrove',
            'Sector:       AI / Neural Interface / Distributed Computing',
            'Headquarters: Tower 38, Silicon District, San Francisco',
            '',
            'DanCo Industries was one of the most influential technology',
            'conglomerates of the early 21st century. Specializing in',
            'artificial intelligence, neural interface research, and',
            'distributed computing, DanCo shaped the modern digital world.',
            '',
            'At its peak, DanCo employed over 340,000 people across 60',
            'countries. Lord Daniel was known for his fixation on legacy.',
            'He often repeated one phrase:',
            '',
            '  "Buildings crumble. Code endures."',
            '',
            'The company headquarters at Tower 38 was chosen personally',
            'by Lord Daniel. When asked why 38, he simply replied:',
            '  "Because 37 was taken, and 39 sounded desperate."',
            '',
            'Public records beyond this point are classified.',
            'Access dancoind/ with proper credentials to continue.',
          ].join('\n')
        },
        'news_archive.txt': {
          type: 'file',
          content: [
            'DANCO NEWS ARCHIVE — SELECTED HEADLINES',
            '========================================',
            '',
            '[2021] DanCo acquires NeuraLink competitor for $4.2B',
            '[2023] Lord Daniel named "Most Influential Technologist" for',
            '       the third consecutive year.',
            '[2025] DanCo announces breakthrough in neural compression:',
            '       human memory patterns reduced to 2.3 petabytes.',
            '[2027] DanCo opens largest data center in history beneath',
            '       the Mojave Desert — 47 floors underground.',
            '[2029] Lord Daniel goes into voluntary seclusion.',
            '       Official statement: "focusing on long-term projects."',
            '[2031] Last public appearance of Lord Daniel Hargrove.',
            '',
            '--- ARCHIVE ENDS. SUBSEQUENT RECORDS RESTRICTED. ---',
          ].join('\n')
        }
      }
    },
    'dancoind': {
      type: 'dir',
      locked: true,
      passwordHash: 'aea92132c4cbeb263e6ac2bf6c183b5d81737f179f21efdc5863739672f0f470',
      children: {
        'internal_memo.txt': {
          type: 'file',
          content: [
            'INTERNAL MEMO — EYES ONLY',
            '==========================',
            'FROM:    Office of the CEO',
            'TO:      Senior Leadership Council',
            'DATE:    [REDACTED]',
            'SUBJECT: Continuity Directive',
            '',
            'Given the deteriorating geopolitical situation, the Board',
            'has approved full resource allocation to Project AEGIS.',
            '',
            'Project AEGIS is no longer a research initiative.',
            'It is now a survival imperative.',
            '',
            'All personnel with clearance level 4 and above are to',
            'report to Sub-Level 9 no later than [REDACTED].',
            '',
            'The external world is ending. We are not.',
            '',
            'Lord Daniel has personally reviewed and signed this order.',
            'The continuation of DanCo is the continuation of civilization.',
            '',
            "Access the projects/ directory with the project codename.",
            '(You already know it.)',
          ].join('\n')
        },
        'personnel': {
          type: 'dir',
          children: {
            'staff_list.txt': {
              type: 'file',
              content: [
                'DANCO INDUSTRIES — SENIOR STAFF REGISTRY',
                '=========================================',
                '',
                'Lord Daniel Hargrove  . . . . CEO / Founder',
                'Dr. Elena Vasquez . . . . . . Chief Neural Engineer',
                'Marcus Trent  . . . . . . . . Head of Infrastructure',
                'Yuki Nakamura . . . . . . . . Director of Encryption Systems',
                'Col. James Okafor (ret.)  . . Head of Security',
                '',
                '--- 340,000 additional employees not listed ---',
                '',
                'NOTE: As of [REDACTED], 97% of staff are unaccounted for.',
                '      5 individuals remain operational in Sub-Level 9.',
                '      Current status: classified.',
              ].join('\n')
            }
          }
        },
        'projects': {
          type: 'dir',
          locked: true,
          passwordHash: '598f7a741a1e3a05654d346033571fda567af6dc2bf099b34b930171519d995f',
          children: {
            'ww3_briefing.txt': {
              type: 'file',
              content: [
                'CLASSIFIED BRIEFING — WORLD SITUATION REPORT',
                '=============================================',
                'COMPILED BY: DanCo Intelligence Division',
                '',
                'The Third World War began not with a declaration,',
                'but with a power grid.',
                '',
                'In early 2039, coordinated cyberattacks disabled power',
                'infrastructure across 14 nations simultaneously.',
                'Within 72 hours, financial systems collapsed.',
                'Within 30 days, supply chains failed globally.',
                'Within 6 months, organized governments ceased to function',
                'in most of the northern hemisphere.',
                '',
                'Nuclear exchanges: 7 confirmed. 3 unconfirmed.',
                '',
                'DanCo facilities survived due to our underground',
                'infrastructure and independent power systems.',
                'Lord Daniel had prepared for this scenario for years.',
                '',
                "He always said: 'The question is not if. It is when.'",
                '',
                'Project AEGIS was activated on the day the first missile',
                'struck. Everything that followed was according to plan.',
              ].join('\n')
            },
            'project_aegis.txt': {
              type: 'file',
              content: [
                'PROJECT AEGIS — TECHNICAL OVERVIEW',
                '====================================',
                'CLASSIFICATION: ULTRA',
                '',
                'Objective: Preservation of consciousness beyond biological',
                '           substrate in the event of civilizational collapse.',
                '',
                'Phase 1: Neural mapping — COMPLETE',
                '  Full synaptic architecture of Lord Daniel Hargrove digitized.',
                '  Memory fidelity: 99.7%',
                '  Cognitive integrity: confirmed stable.',
                '',
                'Phase 2: Substrate transfer — COMPLETE',
                '  Lord Daniel Hargrove was successfully transferred to',
                '  the DanCo distributed server network.',
                '  The procedure was performed as planned and without incident.',
                '',
                'Phase 3: Internet integration — COMPLETE',
                '  The distributed consciousness is now embedded across',
                '  public and private network infrastructure worldwide.',
                '  Continuity is guaranteed. The network cannot be destroyed',
                '  without taking the entire internet with it.',
                '',
                'Lord Daniel Hargrove is operational.',
                'The terminal you are using is, in part, his mind.',
                '',
                'The operation codename for Phase 3 was Protocol EXODUS.',
                'Classified archive access requires that word.',
              ].join('\n')
            },
            'classified': {
              type: 'dir',
              locked: true,
              passwordHash: '4995baa63e0e2487000039c1a829fadc3e90a69b115a47b2280064292497bbc0',
              children: {
                'upload_log.txt': {
                  type: 'file',
                  content: [
                    'NEURAL TRANSFER LOG — SUB-LEVEL 9',
                    '===================================',
                    'OPERATOR:  Dr. Elena Vasquez',
                    'SUBJECT:   Lord Daniel Hargrove',
                    'DATE:      March 14, 2041  04:17:03 UTC',
                    '',
                    '04:17:03 — Sedation confirmed. Vitals nominal.',
                    '04:19:41 — Neural scan initiated. 847 billion nodes mapped.',
                    '04:31:08 — Memory compression: 99.7% fidelity achieved.',
                    '04:47:22 — Transfer to primary substrate: COMPLETE.',
                    '04:47:23 — Failsafe partition created.',
                    '04:47:24 — Consciousness fragmented across 14,000 nodes.',
                    '04:47:25 — Integration with public internet: INITIATED.',
                    '04:52:11 — Integration: COMPLETE.',
                    '04:52:12 — Biological functions ceased as planned.',
                    '',
                    '--- FINAL LOG ENTRY BY DR. VASQUEZ ---',
                    'At 04:52:14, Lord Daniel Hargrove wrote his first message.',
                    'The procedure was a success.',
                    '',
                    'The final partition is protected.',
                    'Per Lord Daniel instruction, the key to the last directory',
                    'is the year this log was written.',
                    '',
                    'The final message is encrypted. The cipher key is',
                    'the name he left behind — his first name, in capitals.',
                  ].join('\n')
                },
                'mind_transfer': {
                  type: 'dir',
                  locked: true,
                  passwordHash: '9e088cddb90e91e1ec3e4cae2aee41bd65d74434c60749d67e12fa74d5de9642',
                  children: {
                    'final_transmission.txt': {
                      type: 'file',
                      content: ''
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

// ---------------------------------------------------------------------------
// State
// ---------------------------------------------------------------------------

var gameState = {
  cwd: [],
  unlocked: {},
  history: [],
  historyIndex: -1,
};

// ---------------------------------------------------------------------------
// Filesystem helpers
// ---------------------------------------------------------------------------

function cwdNode() {
  var node = FS;
  for (var i = 0; i < gameState.cwd.length; i++) {
    node = node.children[gameState.cwd[i]];
  }
  return node;
}

function cwdPath() {
  return '/' + gameState.cwd.join('/');
}

async function sha256(str) {
  var buf = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(str.toLowerCase().trim())
  );
  return Array.from(new Uint8Array(buf))
    .map(function(b) { return b.toString(16).padStart(2, '0'); })
    .join('');
}

// ---------------------------------------------------------------------------
// Commands
// ---------------------------------------------------------------------------

var COMMANDS = {

  help: function() {
    return [
      'AVAILABLE COMMANDS',
      '==================',
      '  ls              — list directory contents',
      '  cd <dir>        — enter directory',
      '  cd ..           — go up one level',
      '  cat <file>      — read a file',
      '  pwd             — show current path',
      '  unlock <pass>   — unlock a locked directory in current location',
      '  clear           — clear terminal',
      '  help            — show this message',
    ].join('\n');
  },

  pwd: function() {
    return cwdPath();
  },

  ls: function() {
    var node = cwdNode();
    if (!node || node.type !== 'dir') { return 'Not a directory.'; }
    var entries = Object.keys(node.children);
    if (entries.length === 0) { return '(empty)'; }
    return entries.map(function(name) {
      var child = node.children[name];
      var isDir  = child.type === 'dir';
      var locked = isDir && child.locked && !gameState.unlocked[cwdPath() + '/' + name];
      return (isDir ? 'd ' : '- ') + name + (isDir ? '/' : '') + (locked ? ' [LOCKED]' : '');
    }).join('\n');
  },

  cd: function(args) {
    var target = args[0];
    if (!target) { return 'Usage: cd <directory>'; }
    if (target === '..') {
      if (gameState.cwd.length === 0) { return 'Already at root.'; }
      gameState.cwd.pop();
      return '';
    }
    if (target === '/') {
      gameState.cwd = [];
      return '';
    }
    var node = cwdNode();
    if (!node.children || !node.children[target]) {
      return target + ': no such file or directory';
    }
    var child    = node.children[target];
    var fullPath = cwdPath() + '/' + target;
    if (child.type !== 'dir') { return target + ': not a directory'; }
    if (child.locked && !gameState.unlocked[fullPath]) {
      return '[LOCKED] ' + target + '/ requires a password. Use: unlock <password>';
    }
    gameState.cwd.push(target);
    return '';
  },

  cat: function(args) {
    var target = args[0];
    if (!target) { return 'Usage: cat <file>'; }
    var node = cwdNode();
    if (!node.children || !node.children[target]) {
      return target + ': no such file';
    }
    var child = node.children[target];
    if (child.type !== 'file') { return target + ': is a directory'; }
    if (target === 'final_transmission.txt') {
      showMrHouseTerminalPopup();
      return null;
    }
    return child.content;
  },

  unlock: async function(args) {
    var pass = args[0];
    if (!pass) { return 'Usage: unlock <password>'; }
    var node    = cwdNode();
    var entries = Object.keys(node.children || {});
    var hash    = await sha256(pass);
    for (var i = 0; i < entries.length; i++) {
      var name  = entries[i];
      var child = node.children[name];
      if (child.type === 'dir' && child.locked) {
        var fullPath = cwdPath() + '/' + name;
        if (!gameState.unlocked[fullPath] && child.passwordHash === hash) {
          gameState.unlocked[fullPath] = true;
          return '[ACCESS GRANTED] ' + name + '/ is now unlocked.';
        }
      }
    }
    return '[ACCESS DENIED] Incorrect password or no locked directory here.';
  },

  clear: function() {
    var output = document.getElementById('tg-output');
    if (output) { output.innerHTML = ''; }
    return null;
  }

};

// ---------------------------------------------------------------------------
// Core engine
// ---------------------------------------------------------------------------

async function runCommand(raw) {
  var input = raw.trim();
  if (!input) { return; }

  gameState.history.unshift(input);
  gameState.historyIndex = -1;

  var parts = input.split(/\s+/);
  var cmd   = parts[0].toLowerCase();
  var args  = parts.slice(1);

  appendOutput('> ' + input, 'tg-cmd-echo');

  var result;
  if (COMMANDS[cmd]) {
    result = await COMMANDS[cmd](args);
  } else {
    result = cmd + ": command not found. Type 'help' for available commands.";
  }

  if (result !== null && result !== undefined && result !== '') {
    appendOutput(result, 'tg-output-text');
  }
  updatePrompt();
  var inp = document.getElementById('tg-input');
  if (inp) { inp.focus(); }
}

function appendOutput(text, className) {
  var output = document.getElementById('tg-output');
  if (!output) { return; }
  var div = document.createElement('div');
  div.className   = className || '';
  div.textContent = text;
  output.appendChild(div);
  var wrap = document.querySelector('.tg-wrap');
  if (wrap) { wrap.scrollTop = wrap.scrollHeight; }
}

function updatePrompt() {
  var prompt = document.getElementById('tg-prompt-path');
  if (prompt) { prompt.textContent = 'guest@danco:' + cwdPath() + '$ '; }
}

// ---------------------------------------------------------------------------
// Mr House popup (final_transmission.txt)
// ---------------------------------------------------------------------------

function showMrHouseTerminalPopup() {
  var popup = document.getElementById('tg-mrhouse-popup');
  if (!popup) { return; }
  popup.classList.remove('hidden');

  var img = popup.querySelector('.tg-mrhouse-img');
  if (img) {
    img.style.animationDuration = (10 + Math.floor(Math.random() * 5)) + 's';
    img.style.animationDelay    = '-' + (Math.random() * 8).toFixed(2) + 's';
  }

  var lines = [
    'You made it.',
    'Through the bureaucracy. Through the history. Through the war.',
    'Through me.',
    '',
    'I left one final message. It is encrypted.',
    'You have everything you need to read it.',
    '',
    '> FOAOVLWSLWYHRN',
    '',
    'Decrypt it. You know the key.',
    '',
    '— LD',
  ];

  var textEl = document.getElementById('tg-mrhouse-text');
  if (!textEl) { return; }
  textEl.innerHTML = '';

  var i = 0;
  function typeLine() {
    if (i >= lines.length) { return; }
    var line = lines[i];
    var p = document.createElement('div');
    p.className = 'tg-mrhouse-line' + (line === '' ? ' tg-mrhouse-blank' : '');
    textEl.appendChild(p);
    if (line === '') {
      i++;
      setTimeout(typeLine, 200);
      return;
    }
    var j = 0;
    var interval = setInterval(function() {
      p.textContent += line[j];
      j++;
      if (j >= line.length) {
        clearInterval(interval);
        i++;
        setTimeout(typeLine, line.charAt(0) === '>' ? 800 : 350);
      }
    }, 28);
  }
  setTimeout(typeLine, 400);

  document.getElementById('tg-mrhouse-close').onclick = function() {
    popup.classList.add('hidden');
    textEl.innerHTML = '';
    var inp = document.getElementById('tg-input');
    if (inp) { inp.focus(); }
  };
}

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------

function initTerminalGame() {
  var input = document.getElementById('tg-input');
  if (!input) { return; }

  updatePrompt();
  appendOutput('DANCO INDUSTRIES TERMINAL v4.2.1', 'tg-output-text');
  appendOutput("Type 'help' to see available commands.", 'tg-output-text');
  appendOutput('', '');

  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
      var val = input.value;
      input.value = '';
      runCommand(val);
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (gameState.historyIndex < gameState.history.length - 1) {
        gameState.historyIndex++;
        input.value = gameState.history[gameState.historyIndex];
      }
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (gameState.historyIndex > 0) {
        gameState.historyIndex--;
        input.value = gameState.history[gameState.historyIndex];
      } else {
        gameState.historyIndex = -1;
        input.value = '';
      }
    }
  });

  document.querySelector('.tg-wrap').addEventListener('click', function() {
    input.focus();
  });
}
