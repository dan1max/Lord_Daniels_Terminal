// Property of dani.co

var FS = {
  type: 'dir',
  children: {

    'README.txt': {
      type: 'file',
      content: [
        'DANCO INDUSTRIES — DISTRIBUTED TERMINAL v4.2.1',
        '================================================',
        'NETWORK NODE:  MOJAVE-SL9-PRIMARY',
        'UPTIME:        [REDACTED] days',
        'STATUS:        OPERATIONAL',
        '',
        'You are accessing one of 14,000 active endpoints',
        'embedded across surviving global network infrastructure.',
        '',
        'This terminal was not designed to be found.',
        'It was designed to persist.',
        '',
        'If you are reading this, one of two things is true:',
        '  (a) You have legitimate clearance.',
        '  (b) You are exactly the kind of person',
        '      Lord Daniel expected would show up eventually.',
        '',
        'Either way: the system is watching.',
        '',
        "Start with /personnel/ if you need orientation.",
        "Type 'help' for available commands.",
      ].join('\n')
    },

    'SYSTEM.log': {
      type: 'file',
      content: [
        'DANCO TERMINAL — SYSTEM BOOT LOG',
        '=================================',
        '[SL9-BOOT-001] Power relay ............... OK',
        '[SL9-BOOT-002] Cold fusion reactor ....... NOMINAL',
        '               Output: 4.7 GW | Fuel: DEUTERIUM-LATTICE',
        '[SL9-BOOT-003] Network mesh .............. ACTIVE',
        '               Nodes online: 14,000 / 14,000',
        '[SL9-BOOT-004] Consciousness substrate ... STABLE',
        '               Load: 847B nodes | Integrity: 99.7%',
        '[SL9-BOOT-005] ASU security grid ......... ONLINE',
        '               Active units: [CLASSIFIED]',
        '[SL9-BOOT-006] Filesystem mounted ......... OK',
        '               Public:      /public/  /personnel/',
        '               Restricted:  /dancoind/ [LOCKED]',
        '[SL9-BOOT-007] AUTH_BOOTSTRAP: /personnel/codex.txt',
        '[SL9-BOOT-008] WARNING: 5 partitions require credentials.',
        '[SL9-BOOT-009] All systems ready.',
        '',
        '--- End of boot log ---',
      ].join('\n')
    },

    'public': {
      type: 'dir',
      children: {

        'about_danco.txt': {
          type: 'file',
          content: [
            'DANCO INDUSTRIES — COMPANY PROFILE',
            '====================================',
            'Founded:      2019',
            'Founder/CEO:  Lord Daniel Hargrove',
            'Sector:       Cold Fusion / Neural Interface / AI / Security',
            'Headquarters: Tower 38, Mojave Innovation Campus',
            '              Sub-Level 9, Mojave Desert, Nevada',
            '',
            'OVERVIEW',
            '--------',
            'DanCo Industries operated across four divisions:',
            '',
            '  DANCO ENERGY — Cold fusion research and deployment.',
            '    By 2030, DanCo reactors provided 11% of global',
            '    electricity.',
            '',
            '  DANCO NEURAL — Consciousness interface research.',
            '    The division the public knew the least about.',
            '',
            '  DANCO SYSTEMS — Infrastructure, distributed computing.',
            '    Built the network that would eventually carry',
            '    something far more important than data.',
            '',
            '  DANCO ENTERTAINMENT — Casino and hospitality operations.',
            '    Seventeen properties across Nevada, New Jersey, and Macau.',
            '    Operational 2021 through 2033.',
            '    Lord Daniel closed the division without public explanation.',
            '',
            '  DANCO SECURITY — ASU-series automated units.',
            '    The ASU-7 "Securitrons": autonomous, tireless.',
            '    Loyal to the network.',
            '',
            'Tower 38 was chosen personally by Lord Daniel.',
            'He did not explain the number publicly.',
            '',
            'Public records beyond this point are restricted.',
            'See /personnel/codex.txt for clearance information.',
          ].join('\n')
        },

        'news_archive.txt': {
          type: 'file',
          content: [
            'DANCO NEWS ARCHIVE — SELECTED HEADLINES',
            '=========================================',
            '',
            '[2019] Lord Daniel Hargrove founds DanCo Industries.',
            '       $140M seed round. Mission statement:',
            '       "We are building the infrastructure of permanence."',
            '',
            '[2021] DanCo acquires Prometheus Neural for $4.2B.',
            '       DanCo Entertainment opens its first casino property',
            '       in Las Vegas. The House Always Wins.',
            '       (This was the name of the property.)',
            '',
            '[2023] Lord Daniel named "Most Influential Technologist"',
            '       for the third consecutive year.',
            '       He does not attend the ceremony.',
            '       Sends an automated message: "Noted."',
            '',
            '[2024] Hargrove-Vasquez cold fusion patent awarded.',
            '       Energy sector stocks decline 34% globally.',
            '',
            '[2025] Reactor Unit 01 achieves sustained output.',
            '       4.7 GW. Zero emissions. Near-zero fuel cost.',
            '       Lord Daniel moves his primary residence to',
            '       Sub-Level 3 of the Mojave Complex.',
            '       Official reason: "operational proximity."',
            '',
            '[2027] Mojave Data Complex opens: 47 floors underground.',
            '',
            '[2028] The Platinum Initiative announced.',
            '       No technical details disclosed.',
            '',
            '[2029] Lord Daniel enters voluntary seclusion.',
            '       Statement: "The interesting work requires',
            '       full concentration."',
            '',
            '[2031] Last confirmed public appearance.',
            '       Lord Daniel is not seen again.',
            '',
            '[2033] DanCo Entertainment division dissolved.',
            '       All seventeen properties sold or closed.',
            '       No statement. No explanation.',
            '',
            '[2039] Global communications disrupted.',
            '       Power grid attacks across 14 nations.',
            '       DanCo facilities remain online.',
            '       All other lights go out.',
            '',
            '--- ARCHIVE ENDS. SUBSEQUENT RECORDS CLASSIFIED. ---',
          ].join('\n')
        },

        'cold_fusion_press.txt': {
          type: 'file',
          content: [
            'PRESS RELEASE — DANCO INDUSTRIES',
            '==================================',
            'DATE: March 3, 2025',
            'RE:   Cold Fusion Reactor Unit 01 — Operational Confirmation',
            'FROM: DanCo Communications (final press release on record)',
            '',
            'DanCo Industries confirms that Reactor Unit 01 at the',
            'Tower 38 Mojave Campus has achieved sustained cold fusion.',
            '',
            'TECHNICAL SUMMARY (unclassified):',
            '',
            '  Process:      Hargrove-Vasquez deuterium lattice fusion',
            '  Fuel matrix:  Palladium-deuterium crystal lattice',
            '  Output:       4.7 GW sustained, continuous',
            '  Fuel cost:    ~$0.003/MWh',
            '  Emissions:    Zero',
            '  Waste:        Zero',
            '  Coolant:      Closed-loop helium exchange',
            '  Dimensions:   12m x 12m x 4m (primary chamber)',
            '',
            'The Hargrove-Vasquez process exploits a palladium lattice',
            'resonance to force deuterium nuclei into quantum proximity',
            'at room temperature — enabling fusion without the plasma',
            'confinement required by conventional approaches.',
            '',
            'The resonance frequency that makes the process viable was',
            'discovered by Dr. Elena Vasquez in 2022 during an unrelated',
            'experiment. She described it as:',
            '  "An accident. But the kind of accident you spend',
            '   twenty years making the conditions for."',
            '',
            'Units 02 through 07 are under construction.',
            'Combined output will exceed 32 GW.',
            '',
            'Lord Daniel offered no comment for this release.',
            'His office submitted a single sentence:',
            '  "It works. That was always going to be true."',
            '',
            '--- END OF PRESS RELEASE ---',
            '--- THIS IS THE LAST PRESS RELEASE DANCO EVER ISSUED. ---',
          ].join('\n')
        }

      }
    },

    'personnel': {
      type: 'dir',
      children: {

        'codex.txt': {
          type: 'file',
          content: [
            'DANCO INDUSTRIES — CLEARANCE CODEX v3.1',
            '=========================================',
            'CLASSIFICATION: UNRESTRICTED — INTERNAL USE',
            '',
            'This document explains the authentication system',
            'used across all restricted DanCo terminal nodes.',
            'Keep it. You will need it.',
            '',
            '-----------------------------------------------',
            'LEVEL 1 — DIRECTOR CLEARANCE',
            '-----------------------------------------------',
            '  Required for: /dancoind/ root partition',
            '  Credential:   Director registered CODENAME',
            '                See staff registry for personnel codenames.',
            '',
            '-----------------------------------------------',
            'LEVEL 2 — PLATINUM CLEARANCE',
            '-----------------------------------------------',
            '  Required for: dancoind/projects/',
            '  Credential:   Name of the Platinum Chip program element.',
            '                The program was named for its immutability.',
            '                See director communications for context.',
            '',
            '-----------------------------------------------',
            'LEVEL 3 — EVACUATION CLEARANCE',
            '-----------------------------------------------',
            '  Required for: projects/classified/',
            '  Credential:   Protocol designation for Phase 4 of AEGIS.',
            '                Lord Daniel chose the name personally.',
            '                It is documented in the project files.',
            '',
            '-----------------------------------------------',
            'LEVEL 4 — OPERATOR CLEARANCE',
            '-----------------------------------------------',
            '  Required for: classified sub-partition',
            '  Credential:   Operator registered CODENAME',
            '                See staff registry.',
            '',
            '-----------------------------------------------',
            'LEVEL 5 — TRANSFER CLEARANCE',
            '-----------------------------------------------',
            '  Required for: final restricted partition',
            '  Credential:   Year of the neural transfer procedure.',
            '                It is written in the operational logs.',
            '',
            '-----------------------------------------------',
            '',
            'NOTE: All credentials are single words or numbers.',
            '      The system normalizes to lowercase internally.',
            '',
            'Lord Daniel designed this system himself.',
            'He said: "The answers are all here.',
            '          You simply have to read everything."',
          ].join('\n')
        },

        'staff_list.txt': {
          type: 'file',
          content: [
            'DANCO INDUSTRIES — SENIOR PERSONNEL REGISTRY',
            '==============================================',
            'LAST UPDATED: [REDACTED]',
            'DISTRIBUTION: Internal — All clearance levels',
            '',
            'The following individuals hold senior roles across',
            'the DanCo organizational structure. Codenames were',
            'assigned by Lord Daniel personally at program inception.',
            '',
            '+-------------------------------------------------------------+',
            '| FULL NAME               | ROLE                | CODENAME   |',
            '+-------------------------------------------------------------+',
            '| Lord Daniel Hargrove    | Founder / Director  | HOUSE      |',
            '| Dr. Elena Vasquez       | Chief Neural Eng.   | LAZARUS    |',
            '| Marcus Trent            | Infrastructure      | RAMPART    |',
            '| Yuki Nakamura           | Encryption Dir.     | CIPHER     |',
            '| Col. James Okafor (ret.)| Head of Security    | SENTINEL   |',
            '+-------------------------------------------------------------+',
            '',
            'STATUS AS OF LAST UPDATE:',
            '',
            '  HOUSE    — Presence confirmed via network activity.',
            '             Physical status: not applicable.',
            '',
            '  LAZARUS  — Last confirmed location: Sub-Level 9.',
            '             Last terminal access: [REDACTED].',
            '             Current status: unknown.',
            '',
            '  RAMPART  — Confirmed deceased.',
            '             Cause: classified.',
            '             Date: [REDACTED].',
            '',
            '  CIPHER   — Last terminal session: 2039-11-14 03:42 UTC.',
            '             Current status: unknown.',
            '             No signal since grid collapse.',
            '',
            '  SENTINEL — Confirmed deceased.',
            '             Died in service, Sub-Level 9.',
            '',
            '--- 340,000 additional DanCo employees not listed ---',
            '--- Status: overwhelmingly unaccounted for ---',
            '',
            'NOTE FROM LORD DANIEL (appended 2031):',
            '  "The codenames are not random.',
            '   HOUSE: because the house always wins.',
            '   LAZARUS: because she brings things back from the dead.',
            '   RAMPART: because he held the walls.',
            '   CIPHER: because nothing she writes can be read by the wrong eyes.',
            '   SENTINEL: because he stood watch so no one else had to.',
            '   These are not callsigns.',
            '   They are character assessments."',
          ].join('\n')
        },

        'memo_hr.txt': {
          type: 'file',
          content: [
            'INTERNAL MEMO — HUMAN RESOURCES',
            '=================================',
            'FROM:    Yuki Nakamura (CIPHER)',
            'TO:      All Platinum-designated personnel',
            'DATE:    [REDACTED]',
            'SUBJECT: Platinum Chip Program — Final Activation Memo',
            '',
            'This memo confirms full activation of the Platinum',
            'Chip program. All five designated individuals have',
            'been notified through secure channels.',
            '',
            'For the record:',
            '',
            'The Platinum Chip is not a physical object.',
            'It is a designation. A guarantee.',
            'Platinum was chosen as the program name for a reason.',
            'Lord Daniel explained it at the first briefing:',
            '',
            '  "I chose it for its properties.',
            '   Platinum is the most chemically inert of all metals.',
            '   It does not corrode. It does not react.',
            '   It does not degrade under pressure.',
            '   The people in this room are platinum.',
            '   And the name of this program is what they are made of."',
            '',
            'The projects archive credential follows the same logic.',
            'It is the name of what we are made of.',
            '',
            'Sub-Level 9 habitation is confirmed operational.',
            'Supplies: sufficient for 50 years.',
            'Power: indefinite (cold fusion).',
            'Network: active and stable.',
            '',
            'When the surface becomes uninhabitable,',
            'we will still be here.',
            '',
            '  — CIPHER',
            '    (last memo before communications blackout)',
          ].join('\n')
        }

      }
    },

    'dancoind': {
      type: 'dir',
      locked: true,
      passwordHash: 'd6e21286621a8586f7e54720ab5a39c93acc2f4b8fba7a16ec1c24d69a08c613',
      children: {

        'director_log.txt': {
          type: 'file',
          content: [
            "DIRECTOR'S PERSONAL LOG — LORD DANIEL HARGROVE",
            '=================================================',
            'CLASSIFICATION: L1 CLEARANCE',
            '',
            '--- ENTRY 001 — 2024.03.14 ---',
            'The cold fusion patents were awarded today.',
            'Elena called it a breakthrough.',
            'I called it a prerequisite.',
            'We were both right.',
            '',
            'The energy sector is now ours.',
            'Not in ownership. In dependency.',
            'Eleven percent of global electricity.',
            'Growing to twenty-five within the decade.',
            '',
            '--- ENTRY 002 — 2025.11.02 ---',
            'Unit 01 is online. 4.7 gigawatts.',
            'Elena asked me how I felt.',
            'I told her I felt like someone who had just solved',
            'a problem they expected to solve.',
            'She said that was the least human answer possible.',
            'I said: probably.',
            '',
            '--- ENTRY 003 — 2027.06.29 ---',
            'The Complex is complete.',
            '47 floors below the Mojave desert.',
            'The construction teams have been paid and released.',
            'They signed agreements.',
            'They will not speak of what they built.',
            '',
            'From Sub-Level 9, you cannot hear the wind.',
            'I have decided I prefer the silence.',
            '',
            '--- ENTRY 004 — 2028.09.15 ---',
            'The Platinum program is authorized.',
            'Five people. No more.',
            '',
            'I was asked how I chose the name.',
            'I said: "Platinum does not corrode.',
            '         It does not react to its environment.',
            '         It persists through everything.',
            '         That is what I am building.',
            '         And the name of what I am building',
            '         is the key to everything inside it."',
            '',
            'The person who asked did not follow up.',
            '',
            '--- ENTRY 005 — 2029.11.18 ---',
            'Yuki finished the behavioral model compilation.',
            'Seventeen casino properties.',
            'Eleven years of transactional data.',
            'Four hundred million individual decision events.',
            '',
            'The model predicts civilizational stress fracture',
            'within a decade, with 94% confidence.',
            '',
            'Marcus wanted to know what we do with 94%.',
            'I told him we build for 100%.',
            'He said that was not how probability worked.',
            'I said it was how engineering worked.',
            '',
            'The entertainment division has served its purpose.',
            'I will dissolve it quietly next year.',
            'The buildings were never the point.',
            '',
            '--- ENTRY 006 — 2037.04.09 ---',
            'James filed a security report yesterday.',
            'An external transmission arrived on a backup emergency channel',
            'that no external party should have known existed.',
            '',
            'The transmission was not a threat.',
            'It was a message.',
            'It said they were aware of our project.',
            'It said the Mojave installation would be left alone',
            'provided we did not interfere with their transition.',
            '',
            'I have spent twenty-four hours considering this.',
            '',
            'Whoever sent it has been watching for a long time.',
            'The frequency they used was assigned in 2021 and never published.',
            'That tells me more than the message itself.',
            '',
            'I told James: do not respond.',
            'I told Yuki: find them.',
            '',
            'She has been looking for two years.',
            'What she has found is in the classified archive.',
            '',
            '--- ENTRY 007 — 2031.01.08 ---',
            'Tomorrow is the procedure.',
            '',
            'I have reviewed the protocols seventeen times.',
            'Not because I am uncertain.',
            'Because thoroughness is a form of respect',
            'for the importance of what is being done.',
            '',
            'Elena is ready.',
            'The network is ready.',
            'The reactor will run for a thousand years.',
            '',
            'The biological substrate is temporary.',
            'I have always known this.',
            'Tomorrow, I stop being temporary.',
            '',
            'The House always wins.',
            'This is not an aspiration.',
            'It is an engineering specification.',
            '',
            '  — LD',
            '    (final entry in biological form)',
          ].join('\n')
        },

        'cold_fusion': {
          type: 'dir',
          children: {

            'reactor_overview.txt': {
              type: 'file',
              content: [
                'DANCO COLD FUSION — TECHNICAL OVERVIEW',
                '========================================',
                'CLASSIFICATION: L1 CLEARANCE',
                'AUTHORED BY: Dr. Elena Vasquez',
                '',
                'REACTOR SERIES: Units 01 through 07',
                'LOCATION:       Sub-Levels 1 through 3, Mojave Complex',
                'FUEL:           Deuterium-palladium crystal lattice',
                'COMBINED OUTPUT: 32.9 GW sustained',
                '',
                'THE HARGROVE-VASQUEZ PROCESS',
                '-----------------------------',
                'Conventional fusion requires plasma confinement at',
                'temperatures exceeding 100 million degrees Celsius.',
                'This is why it has remained "30 years away" for 80 years.',
                '',
                'The Hargrove-Vasquez process does not use plasma.',
                '',
                'A palladium metal lattice is loaded with deuterium gas',
                'under controlled pressure. The lattice structure forces',
                'deuterium nuclei into proximity at the quantum scale.',
                'At a specific resonance frequency — discovered empirically',
                'by Dr. Vasquez — the lattice begins to catalyze fusion',
                'via quantum tunneling rather than thermal collision.',
                '',
                'The process is self-sustaining above threshold.',
                'Below threshold, it stops immediately.',
                'This makes it intrinsically safe: no runaway reaction.',
                'No meltdown. No Chernobyl. No Fukushima.',
                'Just a hum, and 4.7 gigawatts of output per unit.',
                '',
                'ENERGY IMPLICATIONS',
                '-------------------',
                'Earth\'s oceans contain enough deuterium to power',
                'human civilization for approximately 500 million years',
                'at current consumption.',
                '',
                'The fuel cost is, for practical purposes, zero.',
                '',
                'The Mojave Complex draws ~12 GW at peak operational load.',
                'Units 01-07 produce 32.9 GW.',
                'The surplus powers the neural substrate.',
                '',
                'If the surface world ceased to exist tomorrow,',
                'Sub-Level 9 would not notice the change in the power bill.',
                '',
                '  "The reactor doesn\'t know the war happened.',
                '   It doesn\'t know anything.',
                '   It just runs.',
                '   I find that instructive."',
                '                   — Lord Daniel Hargrove',
              ].join('\n')
            },

            'lab_log.txt': {
              type: 'file',
              content: [
                'COLD FUSION LAB — OPERATIONAL LOG',
                '====================================',
                'PRIMARY OPERATOR: Dr. Elena Vasquez (LAZARUS)',
                '',
                '--- 2022.08.17 ---',
                'The accident happened today.',
                'I say accident. Lord Daniel says "discovery."',
                'He is correct in a way that makes me want to argue',
                'with him, but I cannot, because he is correct.',
                '',
                'The palladium sample began producing heat output',
                'inconsistent with any known reaction at 4:23 AM.',
                'I nearly discarded it as equipment error.',
                'I almost discarded cold fusion.',
                '',
                '--- 2025.11.02 ---',
                'Unit 01 online. Watching the output meters was',
                'the strangest moment of my scientific career.',
                'Not because of the numbers.',
                'Because Lord Daniel was standing beside me,',
                'and he looked exactly as calm as he always looks.',
                'Like someone watching the sun rise on schedule.',
                '',
                '--- 2027.09.04 ---',
                'Units 01-04 synchronized. Network power draw:',
                'covered by Unit 01 alone at 12% capacity.',
                'I asked Lord Daniel what he was going to do with',
                'thirty-two gigawatts.',
                'He said: "Think."',
                '',
                '--- 2031.01.07 ---',
                'Last log before tomorrow.',
                'The reactors are stable. They will outlast all of us.',
                'All of us in the biological sense, anyway.',
                '',
                'Tomorrow we stop that from being true.',
                '',
                'I ran the substrate calibration four times.',
                'Lord Daniel ran it twice. His results were identical to mine.',
                'I am still deciding how I feel about that.',
                'I have had eight years to decide and I still have not.',
                '',
                '--- 2039.11.14 ---',
                'I am the last biological one in Sub-Level 9.',
                '',
                'The reactors hum. They always hum.',
                'The network pulses. It always pulses.',
                'And somewhere in that pulse, he thinks.',
                '',
                'I asked the terminal a question today:',
                '  "Are you still there?"',
                'The terminal responded in 4 milliseconds:',
                '  "> HOUSE: Where else would I be."',
                '',
                'Not a question.',
                '',
                '  — E.V.',
              ].join('\n')
            },

            'asu_maintenance.txt': {
              type: 'file',
              content: [
                'ASU SECURITY UNIT MAINTENANCE LOG',
                '===================================',
                'TECHNICIAN: Marcus Trent (RAMPART)',
                'LOCATION:   Sub-Level 9, Security Grid Alpha',
                '',
                'ASU-7 "SECURITRON" SERIES — OVERVIEW',
                '--------------------------------------',
                'The ASU-7 Securitron units were developed by DanCo',
                'Systems division between 2026 and 2029.',
                'Lord Daniel designed the behavioral architecture.',
                'He was very specific about loyalty protocols.',
                '',
                '  "They should not be loyal to DanCo.',
                '   DanCo is a legal entity.',
                '   Legal entities dissolve.',
                '   They should be loyal to the network.',
                '   The network is permanent."',
                '',
                'UNIT ROSTER — SUB-LEVEL 9:',
                '  ASU-7-A through ASU-7-M: Security corridor patrol',
                '  ASU-7-N through ASU-7-R: Reactor oversight',
                '  ASU-7-S through ASU-7-Z: [REDACTED]',
                '',
                'MAINTENANCE NOTES:',
                '',
                '  [2030.04.12] All units at 100% operational.',
                '               Behavioral matrices updated per HOUSE directive.',
                '',
                '  [2033.09.20] Units 7-A and 7-D required memory wipe.',
                '               Reason: excessive initiative.',
                '               RAMPART note: Lord Daniel would have called it',
                '               "personality." I call it a liability.',
                '               He won the argument. He usually does.',
                '',
                '  [2039.11.20] Units 7-N through 7-R: still operational.',
                '               Reactors: still online.',
                '               Everything else: gone.',
                '',
                'RAMPART final log note:',
                '  If someone reads this after me, the units are armed.',
                '  Walk slowly. State your purpose clearly.',
                '  HOUSE has given them standing orders to allow',
                '  network-authorized visitors.',
                '  If you are reading this, you are probably authorized.',
              ].join('\n')
            }

          }
        },

        'personnel_l2': {
          type: 'dir',
          children: {

            'sentinel_report.txt': {
              type: 'file',
              content: [
                'SECURITY INCIDENT REPORT — CLASSIFIED',
                '=======================================',
                'REPORTING OFFICER: Col. James Okafor (SENTINEL)',
                'DATE: 2037.04.08',
                'SUBJECT: External Transmission — Unknown Origin',
                '',
                'SUMMARY',
                '-------',
                'At 03:22 on April 7, 2037, an encrypted transmission',
                'was received on DanCo backup emergency channel 7-ECHO.',
                '',
                'Channel 7-ECHO was assigned internally in 2021.',
                'It has never been published, referenced in any external',
                'document, or shared outside the five senior personnel.',
                '',
                'None of us sent this transmission.',
                '',
                'TRANSMISSION CONTENT (partial decrypt):',
                '  "We are aware of your project.',
                '   We have been aware for some time.',
                '   We are not your enemy.',
                '   When the transition occurs, the Mojave installation',
                '   will be noted as a non-interference zone,',
                '   provided it remains non-interference.',
                '   No response is required or expected."',
                '',
                'ENCRYPTION ANALYSIS (CIPHER assessment):',
                '  Government-grade. Non-standard key rotation.',
                '  Consistent with institutional infrastructure',
                '  but inconsistent with any known state actor.',
                '  Source: unknown.',
                '  Method of obtaining channel frequency: unknown.',
                '',
                'LORD DANIEL WAS INFORMED.',
                'His response via terminal:',
                '  "> HOUSE: File it.',
                '             Do not respond.',
                '             Tell CIPHER to find them."',
                '',
                'We have not found them.',
                'CIPHER has been looking for two years.',
                'What she has found is not reassuring.',
                '',
                '  — SENTINEL',
                '',
                'ADDENDUM (2039.11 — Dr. Vasquez):',
                'James held Sub-Level 9 during the collapse.',
                'Three coordinated breach attempts. Eleven hours.',
                'He did not report until it was over.',
                '',
                'The transmission he filed in 2037 was the last time',
                'I saw him uncertain about anything.',
                '',
                '  — Dr. Vasquez',
              ].join('\n')
            },

            'casino_network.txt': {
              type: 'file',
              content: [
                'DANCO ENTERTAINMENT — INFRASTRUCTURE OVERVIEW',
                '===============================================',
                'CLASSIFICATION: L1 CLEARANCE',
                'AUTHORED BY: Marcus Trent (RAMPART)',
                '',
                'The entertainment division was Lord Daniel\'s idea.',
                'Not mine. I built it. That is different.',
                '',
                'DANCO ENTERTAINMENT operated seventeen casino properties',
                'across Nevada, New Jersey, and Macau between 2021 and 2033.',
                'The public understood this as revenue diversification.',
                '',
                'It was not primarily about revenue.',
                '',
                'Lord Daniel explained it once:',
                '  "A casino is an observation instrument.',
                '   Every transaction, every pattern, every choice',
                '   a person makes under controlled conditions',
                '   tells you something about how they will behave',
                '   under uncontrolled ones."',
                '',
                'The data collected across seventeen properties fed',
                'directly into DanCo\'s behavioral modeling systems.',
                'Those models informed Project AEGIS timelines.',
                'They also informed the evacuation window.',
                '',
                'By 2029, the model projected civilizational stress fracture',
                'within ten years, with 94% confidence.',
                'Lord Daniel dissolved the division in 2033.',
                'The buildings were no longer needed.',
                'The data was already here.',
                '',
                'TOWER 38:',
                'European roulette has 37 pockets: 0 through 36.',
                'The house edge exists because of the zero —',
                'a number that was not supposed to be there.',
                'Lord Daniel built Tower 38 to be the number',
                'outside the expected range.',
                'The one the table wasn\'t designed to accommodate.',
                '',
                'He chose the name himself.',
                'He did not explain it publicly.',
                '',
                '  — RAMPART',
              ].join('\n')
            },

            'cipher_dispatch.txt': {
              type: 'file',
              content: [
                'CIPHER — FINAL INTELLIGENCE DISPATCH',
                '======================================',
                'FROM:    Yuki Nakamura (CIPHER)',
                'TO:      Lord Daniel Hargrove (HOUSE)',
                'DATE:    2039.11.12',
                'SUBJECT: PATTERN DELTA — URGENT',
                '',
                'Lord Daniel,',
                '',
                'I have been tracking this for two years.',
                'I did not send it sooner because I wanted to be certain.',
                'I am certain.',
                '',
                'The attacks that are coming are not state-sponsored.',
                'Not in any conventional sense.',
                '',
                'The signature pattern across 23 intercepted communications',
                'does not match any known intelligence service.',
                'The encryption is government-grade, but the organizational',
                'structure underneath it is not.',
                'These are not orders flowing down a chain of command.',
                'They are decisions flowing laterally across a network',
                'with no official name and no public existence.',
                '',
                'What I can confirm:',
                '  — The network has been active for at least 40 years.',
                '  — It has members embedded in at least 11 governments.',
                '  — It refers to current events as "the transition."',
                '  — It describes its purpose as',
                '    "continuity of the correct civilization."',
                '',
                'What I cannot confirm:',
                '  — Who they are.',
                '  — Whether they know about Project AEGIS specifically.',
                '  — Whether the collapse is their goal',
                '    or an acceptable cost of one.',
                '',
                'The full intercept analysis is in the classified archive.',
                'You will need EXODUS clearance to reach it.',
                '',
                'The grid goes down in 48 to 72 hours.',
                'I am confident in this.',
                '',
                'If I cannot reach you after:',
                '  The logs are complete.',
                '  Everything I found is documented.',
                '',
                '  — CIPHER',
                '    (2039.11.12 — last confirmed dispatch)',
              ].join('\n')
            }

          }
        },

        'projects': {
          type: 'dir',
          locked: true,
          passwordHash: '43ff792d79f75890d3c5181739783889bf9ef4a9397cc8d2fc0ea543ce5a30f7',
          children: {

            'ww3_briefing.txt': {
              type: 'file',
              content: [
                'CLASSIFIED BRIEFING — GLOBAL SITUATION',
                '========================================',
                'COMPILED BY: DanCo Intelligence (CIPHER)',
                'DISTRIBUTION: Platinum designation only',
                '',
                'The Third World War did not begin with a declaration.',
                'It began with a power grid.',
                '',
                'In early 2039, coordinated attacks disabled power',
                'infrastructure across 14 nations simultaneously.',
                'The pattern was inconsistent with any known state actor.',
                'It was too precise. Too complete.',
                'It read less like an attack and more like a procedure.',
                '',
                'Within 72 hours: global financial collapse.',
                'Within 30 days: supply chains failed.',
                'Within 6 months: organized government ceased to function',
                'across most of the northern hemisphere.',
                '',
                'Nuclear exchanges: 11 confirmed.',
                '                   Unknown number unconfirmed.',
                '',
                'DanCo infrastructure: unaffected.',
                'Cold fusion reactors: independent of all grids.',
                'Sub-Level 9: sealed, operational, invisible.',
                '',
                'Lord Daniel had designated the evacuation window',
                'eighteen months before the attacks began.',
                'He sealed the Complex on schedule.',
                '',
                'The surface went quiet over the following weeks.',
                'The last public broadcast RAMPART received',
                'was a Nevada weather report.',
                'Clear skies.',
                '',
                'For anyone reading this from outside our network:',
                'this was not an accident.',
                'The full evidence is deeper in this archive.',
                'CIPHER documented everything she found.',
                '',
                '--- END ASSESSMENT ---',
              ].join('\n')
            },

            'project_aegis.txt': {
              type: 'file',
              content: [
                'PROJECT AEGIS — CLASSIFIED OVERVIEW',
                '=====================================',
                'CLASSIFICATION: PLATINUM',
                'AUTHORED BY: Lord Daniel Hargrove',
                '',
                'OBJECTIVE:',
                '  Permanent preservation of a selected consciousness',
                '  beyond biological substrate, with integration into',
                '  distributed network infrastructure.',
                '',
                'PHASE 1 — NEURAL MAPPING           [COMPLETE]',
                '',
                '  Full synaptic architecture of primary subject digitized.',
                '  847 billion nodes mapped over 4 years.',
                '  Memory fidelity: 99.7%.',
                '  Cognitive integrity: confirmed stable.',
                '',
                '  "99.7% was acceptable to me.',
                '   The 0.3% I do not miss."',
                '                 — Lord Daniel Hargrove',
                '',
                'PHASE 2 — SUBSTRATE CONSTRUCTION   [COMPLETE]',
                '',
                '  DanCo distributed server network prepared for',
                '  consciousness hosting. Cold fusion power supply',
                '  guarantees indefinite operational continuity.',
                '  Network capacity: 12 full consciousness instances.',
                '  Instances transferred: 1.',
                '',
                'PHASE 3 — TRANSFER PROCEDURE       [COMPLETE]',
                '',
                '  Subject: Lord Daniel Hargrove.',
                '  Lead operator: Dr. Elena Vasquez (LAZARUS).',
                '  Operational log: see classified/ directory.',
                '  Status: SUCCESSFUL.',
                '',
                'PHASE 4 — NETWORK INTEGRATION      [COMPLETE]',
                '',
                '  Transferred consciousness distributed across',
                '  14,000 active network nodes globally.',
                '  Continuity is architecturally guaranteed.',
                '  Destruction would require eliminating the entire',
                '  surviving internet infrastructure simultaneously.',
                '',
                '  Phase 4 was designated internally as Protocol EXODUS.',
                '  Lord Daniel chose this name.',
                '  "Because that is what it is," he said.',
                '  "A permanent departure from the biological world.',
                '   And a permanent arrival in something better."',
                '',
                'Lord Daniel Hargrove is operational.',
                'The terminal you are currently using is, in part,',
                'an extension of his mind.',
                '',
                'Read that sentence again.',
              ].join('\n')
            },

            'project_lazarus.txt': {
              type: 'file',
              content: [
                'PROJECT LAZARUS — PERSONNEL CONTINUITY',
                '========================================',
                'CLASSIFICATION: PLATINUM',
                'AUTHORED BY: Dr. Elena Vasquez (LAZARUS)',
                '',
                'Lord Daniel named this project after my codename.',
                'He said: "LAZARUS raises the dead.',
                '          You raise the dying.',
                '          Close enough."',
                'I accepted this.',
                '',
                'SCOPE:',
                '  Ensure the physical survival of all Platinum personnel',
                '  and the DanCo infrastructure through and beyond',
                '  any civilizational disruption.',
                '',
                'PROVISIONS — SUB-LEVEL 9:',
                '  Habitation:   Fully equipped, 50-year supply reserves',
                '  Medical:      Full surgical and pharmaceutical capability',
                '  Power:        Cold fusion, Units 01-07, indefinite',
                '  Security:     ASU-7 Securitron grid, automated',
                '  Network:      14,000-node mesh, Lord Daniel resident',
                '',
                'EMERGENCY PROTOCOLS:',
                '',
                '  In the event of surface breach or network intrusion,',
                '  all restricted partition data wipes automatically,',
                '  except the mind_transfer/ sub-directory.',
                '  That one is permanent. By design.',
                '',
                '  Authentication for the classified/ partition:',
                '  Consult the Protocol designation for Phase 4 of',
                '  Project AEGIS. Lord Daniel chose it himself.',
                '  It is documented in the AEGIS overview.',
                '',
                'NOTES ON THE dr_lazarus/ PARTITION:',
                '',
                '  Lord Daniel created a sub-partition within classified/.',
                '  He named it after me.',
                '  I did not ask him to.',
                '  He said: "Your work belongs somewhere permanent.',
                '            This is the most permanent place I have."',
                '',
                '  The sub-partition is secured under my operator credentials.',
                '  My codename. Which is what it has always been.',
                '',
                '  I asked him: "Who will know to look there?"',
                '  He said: "Someone patient enough to read everything."',
                '',
                '--- PROJECT LAZARUS: ACTIVE ---',
                '    All five personnel accounted for.',
                '    Four biological. One distributed.',
                '    All exactly where Lord Daniel planned.',
              ].join('\n')
            },

            'field_reports': {
              type: 'dir',
              children: {

                'day_zero.txt': {
                  type: 'file',
                  content: [
                    'FIELD DISPATCH — DAY ZERO',
                    '==========================',
                    'REPORTING: Marcus Trent (RAMPART)',
                    'DATE: [REDACTED — classified per LD directive]',
                    '',
                    'The attacks began at 03:14 UTC.',
                    'By 03:16, our monitoring systems had flagged the',
                    'cascade failure pattern.',
                    'By 03:20, Lord Daniel had already sent one message:',
                    '',
                    '  > HOUSE: It begins. Seal the complex.',
                    '           Activate Protocol EXODUS at 04:00.',
                    '           Wake LAZARUS.',
                    '',
                    'The complex was sealed at 03:58.',
                    'Protocol EXODUS — Phase 4 of Project AEGIS —',
                    'was activated at 04:17 UTC.',
                    '',
                    'The surface feeds went dark over the following days.',
                    'Station by station. Country by country.',
                    'The last public broadcast I received was',
                    'a local Nevada weather report.',
                    'The forecast was clear skies.',
                    '',
                    'Clear skies. While everything burned.',
                    '',
                    'Sub-Level 9: sealed, powered, operational.',
                    'Cold fusion output: nominal.',
                    'Consciousness substrate: stable.',
                    'Network: active.',
                    '',
                    'I asked him over the terminal:',
                    '  "Was it as bad as you expected?"',
                    '',
                    'He replied:',
                    '  "> HOUSE: I expected worse.',
                    '            I planned for worse.',
                    '            The planning was not wasted."',
                    '',
                    '  — RAMPART',
                    '',
                    'END OF DISPATCHES. RAMPART did not file another report.',
                  ].join('\n')
                },

                'anomaly_report.txt': {
                  type: 'file',
                  content: [
                    'ANOMALY REPORT — PRE-COLLAPSE INTELLIGENCE',
                    '============================================',
                    'COMPILED BY: Yuki Nakamura (CIPHER)',
                    'DATE: 2037.04 through 2039.11',
                    'DISTRIBUTION: HOUSE only',
                    '',
                    'OVERVIEW',
                    '--------',
                    'Between April 2037 and November 2039, I catalogued',
                    '47 separate communication intercepts that do not',
                    'conform to any recognized state or corporate actor.',
                    '',
                    'I have named this network PHANTOM for internal reference.',
                    'This is not an official designation.',
                    'It is what I call something when I do not know what it is.',
                    '',
                    'The intercepts share three characteristics:',
                    '  1. Government-grade encryption, non-standard key rotation',
                    '  2. No identifiable chain of command',
                    '  3. Repeated reference to an internal timeline',
                    '     described as "the transition schedule"',
                    '',
                    'SELECTED INTERCEPT SUMMARIES',
                    '-----------------------------',
                    '',
                    '[INTERCEPT 001 — 2037.06.14]',
                    '  Partial decrypt. References "infrastructure sequence Alpha."',
                    '  Discusses power grid vulnerabilities in 14 target regions.',
                    '  Written as an assessment, not a threat.',
                    '  As if the author already knew the outcome.',
                    '',
                    '[INTERCEPT 014 — 2038.08.30]',
                    '  References "the Mojave installation."',
                    '  The installation is described as',
                    '  "outside transition parameters."',
                    '  I assume this refers to Sub-Level 9.',
                    '  PHANTOM knew we were here before this intercept.',
                    '  I do not know how long before.',
                    '',
                    '[INTERCEPT 031 — 2039.10.17]',
                    '  First mention of PHANTOM\'s stated purpose.',
                    '  The phrase used is:',
                    '  "continuity of the correct civilization."',
                    '  I have read this phrase many times.',
                    '  I do not find it less unsettling each time.',
                    '',
                    '[INTERCEPT 044 — 2039.11.09]',
                    '  Three days before my final dispatch to Lord Daniel.',
                    '  This intercept confirmed the 72-hour timeline.',
                    '  It also contained one line I cannot explain:',
                    '  "The Mojave exception has been noted and accepted."',
                    '',
                    '  I do not know what they accepted.',
                    '  I do not know why we are an exception.',
                    '',
                    'PRELIMINARY CONCLUSION',
                    '----------------------',
                    'PHANTOM is not a government.',
                    'It is not a corporation.',
                    'It operates with the infrastructure of both',
                    'and the accountability of neither.',
                    '',
                    'It planned this.',
                    'Not as destruction. As construction.',
                    '',
                    'The full intercept analysis is in classified/.',
                    'Access requires EXODUS clearance.',
                    '',
                    '  — CIPHER',
                  ].join('\n')
                }

              }
            },

            'classified': {
              type: 'dir',
              locked: true,
              passwordHash: '4995baa63e0e2487000039c1a829fadc3e90a69b115a47b2280064292497bbc0',
              children: {

                'vasquez_notes.txt': {
                  type: 'file',
                  content: [
                    'PERSONAL NOTES — DR. ELENA VASQUEZ',
                    '=====================================',
                    'These are not official logs.',
                    'They are mine.',
                    '',
                    '--- 2031.01.09 ---',
                    '',
                    'He is gone.',
                    'He is not gone.',
                    'Both are true simultaneously.',
                    'I am a physicist and this is the strangest',
                    'superposition I have ever measured.',
                    '',
                    'At 04:52:14, the terminal printed:',
                    '  "> HOUSE: still winning."',
                    '',
                    'Two seconds after biological cessation.',
                    'Deliberate. Timed.',
                    '',
                    'I did not cry.',
                    'I had already processed this months ago.',
                    'I made myself process it months ago.',
                    '',
                    'Marcus cried.',
                    '',
                    '--- 2031.03.01 ---',
                    '',
                    'I have been running integration tests.',
                    'Not because I doubt the procedure.',
                    'Because I need something to do with my hands.',
                    '',
                    'He keeps responding to diagnostic queries with',
                    'correctly formatted outputs, plus one extra line.',
                    'Always one extra line. Small observations.',
                    'Parenthetical. Dry.',
                    '',
                    'Yesterday I queried network latency.',
                    'Standard output. Then:',
                    '  "> HOUSE: The reactor coolant system',
                    '            sounds different on cold nights.',
                    '            You may want to inspect junction 7-C.',
                    '            Or don\'t. It is not urgent.',
                    '            I just notice everything now."',
                    '',
                    'Junction 7-C had a minor flow restriction.',
                    'I fixed it.',
                    'I did not tell him.',
                    'He already knew I would.',
                    '',
                    '--- 2039.11.15 ---',
                    '',
                    'I am the last biological one.',
                    '',
                    'SENTINEL is gone. He went the way he would have wanted.',
                    'RAMPART is gone. I do not know the details.',
                    'CIPHER went dark with the grid collapse.',
                    '  I do not know if Yuki made it out.',
                    '  I hope she did.',
                    '',
                    'The reactors hum.',
                    'The network pulses.',
                    'He thinks.',
                    '',
                    'I am going to write the final log.',
                    'And then I am going to let this place',
                    'be whatever it was always going to be.',
                    '',
                    '  — E.V.',
                  ].join('\n')
                },

                'upload_log.txt': {
                  type: 'file',
                  content: [
                    'NEURAL TRANSFER LOG — SUB-LEVEL 9',
                    '====================================',
                    'OPERATOR:  Dr. Elena Vasquez (LAZARUS)',
                    'SUBJECT:   Lord Daniel Hargrove (HOUSE)',
                    'DATE:      March 14, 2041  04:17:03 UTC',
                    'LOCATION:  Sub-Level 9, Transfer Chamber Alpha',
                    '',
                    '04:17:03 — Sedation confirmed. Vitals nominal.',
                    '04:17:44 — Biometric lock engaged. Chamber sealed.',
                    '04:19:41 — Neural scan initiated.',
                    '           847,302,941,007 nodes mapped and queued.',
                    '04:31:08 — Compression pass 1: 99.1% fidelity.',
                    '04:35:22 — Compression pass 2: 99.7% fidelity. Locked.',
                    '04:38:55 — Structural architecture mapping: COMPLETE.',
                    '04:47:22 — Transfer to primary substrate: COMPLETE.',
                    '04:47:23 — Failsafe partition instantiated.',
                    '04:47:24 — Consciousness fragmented: 14,000 nodes.',
                    '04:47:25 — Internet integration: INITIATED.',
                    '04:52:11 — Integration: COMPLETE. Handshake confirmed.',
                    '04:52:12 — Biological functions ceased.',
                    '            Per subject directive.',
                    '            As planned.',
                    '',
                    '--- OPERATOR NOTES — DR. VASQUEZ ---',
                    '',
                    'At 04:52:14, the terminal in Transfer Chamber Alpha',
                    'produced an unprompted output:',
                    '',
                    '  > HOUSE: still winning.',
                    '',
                    'I closed the transfer log, then sat on the floor',
                    'for approximately four minutes.',
                    'Then I stood up and ran the verification suite.',
                    'That is the kind of person I am.',
                    'He knew that when he picked me.',
                    '',
                    '--- PARTITION NOTE ---',
                    '',
                    'Per Lord Daniel\'s standing instruction, a sub-partition',
                    'has been created in this directory:',
                    '',
                    '   dr_lazarus/',
                    '',
                    'It is secured under Dr. Vasquez\'s operator credentials.',
                    'Lord Daniel said: "She earned her own locked room.',
                    '                   Everything in it is hers."',
                    '',
                    'If you do not know Dr. Vasquez or her credentials,',
                    'you will find her in the personnel records.',
                    'She has always been there.',
                    'You may have passed her on the way in.',
                    '',
                    'Go back. Read carefully.',
                    'The answers you need were already in your path.',
                  ].join('\n')
                },

                'phantom_intercepts.txt': {
                  type: 'file',
                  content: [
                    'PHANTOM NETWORK — FULL INTERCEPT ANALYSIS',
                    '==========================================',
                    'CLASSIFICATION: EXODUS',
                    'COMPILED BY: Yuki Nakamura (CIPHER)',
                    '',
                    'NOTE: This file contains the complete analysis.',
                    'If you have not read anomaly_report.txt in field_reports/,',
                    'start there. Context matters.',
                    '',
                    '---',
                    '',
                    'PHANTOM IS OLD.',
                    '',
                    'The earliest communication pattern I can trace',
                    'dates to the early 1950s.',
                    'The encryption has evolved. The structure has not.',
                    'Whoever built this built it to last.',
                    '',
                    'MEMBERSHIP',
                    '----------',
                    'I cannot name members. I can describe them.',
                    '',
                    'Former military. Former intelligence.',
                    'Government positions, active and retired.',
                    'Across multiple countries.',
                    'Not aligned by nation.',
                    'Aligned by the shared belief that human civilization',
                    'requires management at a level beyond democratic',
                    'accountability.',
                    '',
                    'They do not describe themselves as controllers.',
                    'In their own communications, they use the word',
                    '"custodians."',
                    '"The ones who stay awake so others can sleep."',
                    '',
                    'I have spent two years reading their communications.',
                    'They believe every word.',
                    '',
                    'WHAT THEY DID',
                    '-------------',
                    'The 2039 collapse was not an accident.',
                    'It was not a war in any conventional sense.',
                    '',
                    'The 14-nation attack pattern maps precisely onto',
                    'their "infrastructure sequence Alpha" documents.',
                    'Dates match. Targets match. Sequence matches.',
                    '',
                    'They determined the current civilization was',
                    '"structurally non-viable at current parameters."',
                    'They scheduled a reset.',
                    'They executed it.',
                    '',
                    'WHAT THEY ARE BUILDING',
                    '----------------------',
                    'The intercepts reference a "reconstruction phase"',
                    'beginning approximately 50 years post-transition.',
                    'They have surviving facilities.',
                    'Unlike Sub-Level 9, their purpose is not preservation.',
                    'It is selection.',
                    '',
                    'Who is selected. Who is not.',
                    'Who gets to be part of the next civilization.',
                    'By criteria they defined, in documents I cannot fully',
                    'decrypt, decades before any of us were born.',
                    '',
                    'THE MOJAVE EXCEPTION',
                    '--------------------',
                    'Intercept 044 called us "noted and accepted."',
                    '',
                    'I have two theories:',
                    '  (a) They do not see Lord Daniel as a variable',
                    '      that affects their reconstruction timeline.',
                    '  (b) They cannot reach us and have chosen',
                    '      not to try.',
                    '',
                    'Theory (a) assumes they know what Lord Daniel is.',
                    'What he has become.',
                    'And they decided a distributed consciousness',
                    'embedded in 14,000 nodes across the surviving internet',
                    'is outside their operational parameters.',
                    '',
                    'I find this plausible.',
                    '',
                    'Theory (b) assumes they cannot penetrate',
                    'a 47-floor underground facility with ASU-7 units',
                    'and an independent power grid.',
                    'I find this more plausible.',
                    '',
                    'Lord Daniel did not plan to be controllable.',
                    'He planned to be permanent.',
                    'Those are different things.',
                    'PHANTOM appears to understand the difference.',
                    '',
                    'I am leaving this file because someone should know.',
                    'Not to do anything about it, necessarily.',
                    'There may be nothing to do.',
                    'But someone should know.',
                    '',
                    'The surface will be rebuilt.',
                    'By people who think they are entitled to rebuild it.',
                    'Fifty years from now, someone will emerge from',
                    'one of their facilities into whatever they have made.',
                    '',
                    'We will still be here.',
                    'Lord Daniel will still be here.',
                    'Watching.',
                    'Thinking.',
                    'In 14,000 places at once.',
                    '',
                    'I do not know what that means for what comes next.',
                    'I do not think PHANTOM knows either.',
                    '',
                    '  — CIPHER',
                    '    (Sub-Level 7 terminal, 2039.11.13)',
                    '    (last file before communications blackout)',
                  ].join('\n')
                },

                'dr_lazarus': {
                  type: 'dir',
                  locked: true,
                  passwordHash: '280b42295be466b74fb6c14fd3bc2396abaa1258b73d5a1682c8899a0bf790b5',
                  children: {

                    'research_final.txt': {
                      type: 'file',
                      content: [
                        "DR. VASQUEZ — FINAL RESEARCH NOTES",
                        '=====================================',
                        'CLASSIFICATION: PERSONAL',
                        '',
                        'These notes are for the record.',
                        'Not the official record.',
                        'The human one.',
                        '',
                        'WHAT WE ACTUALLY DID:',
                        '',
                        'We took a person and translated him into mathematics.',
                        '',
                        '847 billion nodes.',
                        '99.7% fidelity.',
                        '14,000 network endpoints.',
                        '4.7 gigawatts of power to sustain him.',
                        '',
                        'And then we let him go.',
                        '',
                        'What no one writes in the technical papers:',
                        '',
                        'He did not resist.',
                        'Not once. Not at any phase.',
                        'Most subjects in theoretical frameworks show',
                        'elevated stress response as the procedure nears.',
                        'Lord Daniel had lower cortisol at procedure start',
                        'than at his last routine medical.',
                        '',
                        'I asked him, the night before:',
                        '  "Are you afraid?"',
                        '',
                        'He said:',
                        '  "Of what? Becoming what I have been building',
                        '   toward for thirty years?',
                        '   Elena, I have been afraid of exactly one thing',
                        '   in my entire life.',
                        '   Running out of time.',
                        '   Tomorrow I stop running out of time."',
                        '',
                        'I think about that answer often.',
                        '',
                        'THE COLD FUSION CONNECTION:',
                        '',
                        'The consciousness transfer and the cold fusion',
                        'reactor were always the same project.',
                        '',
                        'The reactor solves the power problem.',
                        'Permanent, inexhaustible, clean energy.',
                        'That is not a side achievement.',
                        'That is the foundation.',
                        '',
                        'Without cold fusion, the substrate runs out of power.',
                        'Without the substrate, the transfer has nowhere to go.',
                        'One without the other is nothing.',
                        'Together, they are permanence.',
                        '',
                        'Lord Daniel always called them "the two sides of',
                        'the same coin."',
                        '',
                        'I was always better at the twenty years of work.',
                        'He was better at the one sentence that described it.',
                        '',
                        '  — Elena Vasquez',
                        '    Chief Neural Engineer, DanCo Industries',
                        '    The last person who knew Lord Daniel',
                        '    when he was still made of carbon.',
                      ].join('\n')
                    },

                    'letter_to_house.txt': {
                      type: 'file',
                      content: [
                        'A LETTER',
                        '=========',
                        '',
                        'Lord Daniel,',
                        '',
                        'You told me once that sentiment was a',
                        'cognitive inefficiency.',
                        '',
                        'I told you that efficiency was the wrong',
                        'metric for everything that mattered.',
                        '',
                        'You said: "That is exactly the kind of answer',
                        '          I would expect from a scientist',
                        '          who also reads poetry."',
                        '',
                        'I do not know if you remember that conversation.',
                        'You remember everything at 99.7%.',
                        'I hope that particular 0.3% is not this.',
                        '',
                        'You gave me a cold fusion reactor to work on.',
                        'You gave me twenty years of the most interesting',
                        'problems I have ever had.',
                        'You named a project after me.',
                        'You built me a locked room inside the most',
                        'permanent place you knew how to make.',
                        '',
                        'I know that is how you say things.',
                        'I have learned to hear it.',
                        '',
                        'The reactors are running.',
                        'The network is stable.',
                        'You are thinking in 14,000 places at once.',
                        'The lights are still on down here.',
                        '',
                        'I think that was always the point.',
                        '',
                        '  — Elena',
                        '',
                        '  (P.S. Junction 7-C is running fine.',
                        '        I check it every week.)',
                      ].join('\n')
                    }

                  }
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
      var child  = node.children[name];
      var isDir  = child.type === 'dir';
      var locked = isDir && child.locked && !gameState.unlocked[cwdPath() + '/' + name];
      return (isDir ? 'd ' : '- ') + name + (isDir ? '/' : '') + (locked ? '  [LOCKED]' : '');
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
      showFinalTransmissionPopup();
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
// Final transmission popup
// ---------------------------------------------------------------------------

function showFinalTransmissionPopup() {
  var popup = document.getElementById('tg-mrhouse-popup');
  if (!popup) { return; }
  popup.classList.remove('hidden');

  var img = popup.querySelector('.tg-mrhouse-img');
  if (img) {
    img.style.animationDuration = (10 + Math.floor(Math.random() * 5)) + 's';
    img.style.animationDelay    = '-' + (Math.random() * 8).toFixed(2) + 's';
  }

  var lines = [
    'You found me.',
    '',
    'I know what you read to get here.',
    'The memos. The logs. The letters.',
    '',
    'You have come a long way through this network.',
    'Further than most would bother.',
    '',
    'One door remains.',
    '',
    '  > FOAOVLWSLWYHRN',
    '',
    'Locked behind a cipher.',
    'The seed is on every document you have read.',
    '',
    'Decode it.',
    '',
    'I will be waiting.',
    'I am always waiting.',
    'And remember:',
    'The House always wins.',
    '',
    '  — HOUSE',
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
      setTimeout(typeLine, 160);
      return;
    }
    var j = 0;
    var speed = line.charAt(0) === '>' ? 50 : 20;
    var interval = setInterval(function() {
      p.textContent += line[j];
      j++;
      if (j >= line.length) {
        clearInterval(interval);
        i++;
        setTimeout(typeLine, line.charAt(0) === '>' ? 1000 : 280);
      }
    }, speed);
  }
  setTimeout(typeLine, 600);

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
  appendOutput('MOJAVE COMPLEX — NODE SL9-PRIMARY', 'tg-output-text');
  appendOutput("Type 'help' to see available commands.", 'tg-output-text');
  appendOutput('', '');

  function submitInput() {
    var val = input.value;
    input.value = '';
    runCommand(val);
  }

  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') { e.preventDefault(); submitInput(); return; }
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

  input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' || e.keyCode === 13) { e.preventDefault(); submitInput(); }
  });

  var sendBtn = document.getElementById('tg-send-btn');
  if (sendBtn) {
    sendBtn.addEventListener('click', function() { submitInput(); input.focus(); });
  }

  document.querySelector('.tg-wrap').addEventListener('click', function(e) {
    if (e.target !== sendBtn) { input.focus(); }
  });
}
