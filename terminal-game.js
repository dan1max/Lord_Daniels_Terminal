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
            "Access dancoind/ with proper credentials to continue.",
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
            "Access the projects/ directory with codename: Project's name.",
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
                '  Personality matrix: stable',
                '',
                'Phase 2: Substrate transfer — COMPLETE',
                "  Subject's consciousness migrated to DanCo's distributed",
                '  server network. The procedure was performed as planned and without incident.',
                '',
                'Phase 3: Internet integration — COMPLETE',
                '  The distributed consciousness is now embedded across',
                '  public and private network infrastructure worldwide.',
                '  It cannot be switched off without destroying the internet.',
                '',
                'Lord Daniel Hargrove is operational.',
                'The terminal you are using is, in part, his mind.',
                '',
                'The operation codename for Phase 3 was Protocol EXODUS.',
                "Classified archive access requires that word.",
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
                    'At 04:52:14, Lord Daniel's first message appeared on screen.',
            'The procedure was a success.',
                    '',
                    'The final partition is protected.',
                    'Per Lord Daniel\'s instruction, the key to the last directory',
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
                      content: [
                        'FINAL TRANSMISSION',
                        '==================',
                        '',
                        'If you are reading this, you found your way through.',
                        'Through the company. Through the war. Through the transfer.',
                        'Through me.',
                        '',
                        'One message remains. It is encrypted.',
                        'You have everything you need to read it.',
                        '',
                        '> FOAOVLWSLWYHRN',
                        '',
                        '— LD',
                      ].join('\n')
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

var gameState = {
  cwd: [],
  unlocked: {},
  history: [],
  historyIndex: -1,
  projectsWarningShown: false,
};

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
  var buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str.toLowerCase().trim()));
  return Array.from(new Uint8Array(buf)).map(function(b) { return b.toString(16).padStart(2, '0'); }).join('');
}

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
      var isDir = child.type === 'dir';
      var locked = isDir && child.locked && !gameState.unlocked[cwdPath() + '/' + name];
      var suffix = isDir ? '/' : '';
      var lock = locked ? ' [LOCKED]' : '';
      return (isDir ? 'd ' : '- ') + name + suffix + lock;
    }).join('\n');
  },

  cd: async function(args) {
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
    var child = node.children[target];
    if (child.type !== 'dir') { return target + ': not a directory'; }
    var fullPath = cwdPath() + '/' + target;
    if (child.locked && !gameState.unlocked[fullPath]) {
      return '[LOCKED] ' + target + '/ requires a password. Use: unlock <password>';
    }
    if (target === 'projects' && !gameState.projectsWarningShown) {
      return new Promise(function(resolve) {
        showClassifiedPopup(function(proceed) {
          if (proceed) {
            gameState.projectsWarningShown = true;
            gameState.cwd.push(target);
          } else {
            appendOutput('[ABORTED] Access to projects/ cancelled.', 'tg-output-text');
          }
          resolve(proceed ? '' : null);
          var inp = document.getElementById('tg-input');
          if (inp) { inp.focus(); }
        });
      });
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
    return child.content;
  },

  unlock: async function(args) {
    var pass = args[0];
    if (!pass) { return 'Usage: unlock <password>'; }
    var node = cwdNode();
    var entries = Object.keys(node.children || {});
    var hash = await sha256(pass);
    var found = false;
    for (var i = 0; i < entries.length; i++) {
      var name = entries[i];
      var child = node.children[name];
      if (child.type === 'dir' && child.locked) {
        var fullPath = cwdPath() + '/' + name;
        if (!gameState.unlocked[fullPath] && child.passwordHash === hash) {
          gameState.unlocked[fullPath] = true;
          found = true;
          return '[ACCESS GRANTED] ' + name + '/ is now unlocked.';
        }
      }
    }
    if (!found) {
      return '[ACCESS DENIED] Incorrect password or no locked directory here.';
    }
  },

  clear: function() {
    var output = document.getElementById('tg-output');
    if (output) { output.innerHTML = ''; }
    return null;
  }
};

async function runCommand(input) {
  input = input.trim();
  if (!input) { return; }

  gameState.history.unshift(input);
  gameState.historyIndex = -1;

  var parts = input.split(/\s+/);
  var cmd = parts[0].toLowerCase();
  var args = parts.slice(1);

  appendOutput('> ' + input, 'tg-cmd-echo');

  var result;
  if (COMMANDS[cmd]) {
    result = await COMMANDS[cmd](args);
  } else {
    result = cmd + ': command not found. Type \'help\' for available commands.';
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
  div.className = className || '';
  div.textContent = text;
  output.appendChild(div);
  output.scrollTop = output.scrollHeight;
  var wrap = document.querySelector('.tg-wrap');
  if (wrap) { wrap.scrollTop = wrap.scrollHeight; }
}

function updatePrompt() {
  var prompt = document.getElementById('tg-prompt-path');
  if (prompt) { prompt.textContent = 'guest@danco:' + cwdPath() + '$ '; }
}


function showClassifiedPopup(callback) {
  var overlay = document.getElementById('tg-classified-overlay');
  if (!overlay) { return callback(false); }
  overlay.classList.remove('hidden');
  document.getElementById('tg-popup-continue').focus();
  document.getElementById('tg-popup-continue').onclick = function() {
    overlay.classList.add('hidden');
    callback(true);
  };
  document.getElementById('tg-popup-back').onclick = function() {
    overlay.classList.add('hidden');
    callback(false);
  };
}

function initTerminalGame() {
  var input = document.getElementById('tg-input');
  if (!input) { return; }

  updatePrompt();

  appendOutput('DANCO INDUSTRIES TERMINAL v4.2.1', 'tg-output-text');
  appendOutput("Type 'help' to see available commands.", 'tg-output-text');
  appendOutput('', '');

  input.addEventListener('keydown', async function(e) {
    if (e.key === 'Enter') {
      var val = input.value;
      input.value = '';
      await runCommand(val);
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
