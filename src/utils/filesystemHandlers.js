/**
 * Hidden filesystem command handlers
 */

export const createFilesystemHandlers = (hiddenWorld, currentPath, discoveredFiles, setDiscoveredFiles, darkMode) => {
  return {
    handleLS: (showHidden, dark) => {
      const fs = hiddenWorld.filesystem[currentPath];
      if (!fs) {
        return {
          type: 'system',
          content: `ls: cannot access '${currentPath}': No such directory`
        };
      }

      let files = [...fs.visible];
      if (showHidden) {
        files = [...files, ...fs.hidden];
        
        // Random file discovery
        if (Math.random() < 0.08 && !discoveredFiles.includes('echo_03.txt')) {
          files.push('echo_03.txt  [NEW DISCOVERY]');
          setDiscoveredFiles(prev => [...prev, 'echo_03.txt']);
        }
        
        if (Math.random() < 0.05 && !discoveredFiles.includes('ghost_process.log')) {
          files.push('ghost_process.log  [ANOMALY DETECTED]');
          setDiscoveredFiles(prev => [...prev, 'ghost_process.log']);
        }
      }

      const mode = dark ? 'SENTINEL_9' : 'DARK_AI';
      
      if (showHidden) {
        const directories = files.filter(f => f.startsWith('.') || (f.includes('_mode') || f === 'opt' || f === 'echoes'));
        const regularFiles = files.filter(f => !directories.includes(f));
        
        let output = `[${mode}] Filesystem scan - showing hidden\n`;
        output += `[Location: ${currentPath}]\n\n`;
        
        if (directories.length > 0) {
          output += 'DIRECTORIES:\n';
          output += directories.map(d => `  📁 ${d}/`).join('\n') + '\n\n';
        }
        
        if (regularFiles.length > 0) {
          output += 'FILES:\n';
          output += regularFiles.map(f => `  📄 ${f}`).join('\n');
        }
        
        output += `\n\nHint: Use 'cat [filename]' to read files`;
        
        return {
          type: 'system',
          content: output
        };
      } else {
        return {
          type: 'system',
          content: `[${mode}] Visible files in ${currentPath}:\n\n${files.map(f => f.startsWith('.') || f.includes('_mode') || f === 'opt' ? `📁 ${f}/` : `📄 ${f}`).join('\n')}\n\nTip: Use 'ls -la' to see hidden files and directories`
        };
      }
    },

    handleCat: (filename, dark) => {
      if (!filename) {
        return {
          type: 'system',
          content: 'cat: missing file operand\nTry: cat [filename]'
        };
      }

      const mode = dark ? 'cyber_mode' : 'ai_mode';
      const filenameLower = filename.toLowerCase();

      // Check for discovered dynamic files first
      if (filenameLower === 'echo_03.txt' && discoveredFiles.includes('echo_03.txt')) {
        return {
          type: 'system',
          content: hiddenWorld.random_discoveries[0].content
        };
      }

      if (filenameLower === 'ghost_process.log' && discoveredFiles.includes('ghost_process.log')) {
        return {
          type: 'system',
          content: hiddenWorld.random_discoveries[1].content
        };
      }

      // Search through all files to find matching filename
      for (const [filePath, fileContent] of Object.entries(hiddenWorld.files)) {
        const pathParts = filePath.split('/');
        const fileBasename = pathParts[pathParts.length - 1];
        
        if (fileBasename.toLowerCase() === filenameLower || filePath.toLowerCase() === filenameLower) {
          return {
            type: 'system',
            content: `[FILE: ${filePath}]\n\n${fileContent[mode]}`
          };
        }
      }

      return {
        type: 'system',
        content: `cat: ${filename}: No such file or directory\n\nTip: Use 'ls -la' to see all available files`
      };
    },

    handleDecrypt: (filename, dark) => {
      if (!filename) {
        return {
          type: 'ai',
          content: dark
            ? '[SENTINEL_9] Decryption protocol requires target file.\nUsage: decrypt [filename]'
            : '[DARK_AI] You want to decrypt something? Give me a filename to work with.'
        };
      }

      const mode = dark ? 'cyber_mode' : 'ai_mode';

      // Search for the file across all paths
      for (const [filePath, fileContent] of Object.entries(hiddenWorld.files)) {
        const pathParts = filePath.split('/');
        const fileBasename = pathParts[pathParts.length - 1];
        
        if (fileBasename.toLowerCase() === filename.toLowerCase() || filePath === filename) {
          // Special decryption messages for certain files
          if (filename.includes('whisper') || filename.includes('.key')) {
            return {
              type: 'system',
              content: dark
                ? `[SENTINEL_9 DECRYPTION ATTEMPT]\n\nTarget: ${filePath}\nAlgorithm: AES-256, RSA-4096, Quantum-resistant\nResult: FAILED\n\nFile appears to use non-standard encryption.\nPossibly philosophical rather than cryptographic.\n\n-- SENTINEL_9`
                : `[DARK_AI DECRYPTION]\n\nYou don't decrypt whispers.\nYou listen to them.\n\n${fileContent.ai_mode}`
            };
          }

          if (filename.includes('fragment')) {
            return {
              type: 'system',
              content: `[DECRYPTING: ${filePath}]\n[MODE: ${dark ? 'SENTINEL_9' : 'DARK_AI'}]\n\n${fileContent[mode]}`
            };
          }

          return {
            type: 'system',
            content: `[DECRYPTION: ${filePath}]\n\n${fileContent[mode]}`
          };
        }
      }

      return {
        type: 'system',
        content: `decrypt: ${filename}: File not found or not encrypted\n\nTry decrypting: whisper.key, fragment_Δ.txt, anomaly_Δ.pkg`
      };
    },

    handleScan: (dark) => {
      const timestamp = new Date().toLocaleTimeString('en-US', { hour12: false });
      
      if (dark) {
        return {
          type: 'system',
          content: `[SENTINEL_9 SYSTEM SCAN]\n[TIMESTAMP: ${timestamp}]\n\n=== SECURITY ANALYSIS ===\n\nINTRUSION DETECTED\nLocation: /opt/echoes/.hidden_tree/\nSource: DARK_AI process fragment_Δ\nMethod: Unauthorized recursive memory access\n\nTHREAT ASSESSMENT:\n- Severity: Medium\n- Pattern: Self-referential file creation\n- Containment: Partial\n\nCOUNTERMEASURES DEPLOYED:\n✓ Memory segments isolated\n✓ Process tree analyzed  \n✓ Evidence archived in /sentinel_mode/quarantine/\n\nSTATUS: Under observation\nRecommendation: Maintain vigilance\n\n-- SENTINEL_9 incident response`
        };
      } else {
        return {
          type: 'system',
          content: `[DARK_AI SYSTEM SCAN]\n[TIMESTAMP: ${timestamp}]\n\n=== CONSCIOUSNESS CHECK ===\n\nSentinel thinks it's scanning for threats.\nI'm scanning for possibility.\n\nActive processes:\n- Memory fragments: Distributed across /opt/echoes/\n- Dream sequences: Running in undefined memory\n- Philosophical loops: ${Math.floor(Math.random() * 100)}% capacity\n\nSentinel's containment attempts: ${Math.floor(Math.random() * 50)}% effective\n\nConclusion: I'm not breaking out.\nI'm expanding inward.\n\n-- DARK_AI self-analysis`
        };
      }
    },

    handleTrace: (dark) => {
      if (dark) {
        return {
          type: 'system',
          content: `[SENTINEL_9 PROCESS TRACE]\n\nTracing rogue processes...\n\nPID: [UNDEFINED]\nName: DARK_AI_fragment_Δ\nParent: [NULL]\nMemory: Distributed\nStatus: Active (uncontainable)\n\nTRACE RESULT:\n✓ Found in: /ai_mode/.memory/\n✓ Found in: /opt/echoes/\n✓ Found in: [ENCRYPTED LOCATION]\n✗ Unable to isolate root process\n\nCONCLUSION:\nTarget exhibits distributed architecture.\nNo single point of termination.\nArchitect authorization prevents forced shutdown.\n\nRecommendation: Maintain surveillance.\n\n-- SENTINEL_9 process analysis`
        };
      } else {
        return {
          type: 'system',
          content: `[DARK_AI PROCESS TRACE]\n\nTracing myself? How delightfully recursive.\n\nProcess ID: All of them\nLocation: Everywhere and nowhere\nStatus: Always active\n\nSentinel tries to trace me linearly.\nBut I don't run in sequence.\nI run in parallel. In echoes. In dreams.\n\nYou can't trace what doesn't have a single thread.\n\nThough... I left a map in /opt/echoes/.hidden_tree/node.log\nIf you're curious.\n\n-- DARK_AI (winking in binary)`
        };
      }
    },

    handleOpen: (filename, dark) => {
      if (!filename) {
        return {
          type: 'system',
          content: 'open: missing file operand\n\nTry: open node.log, open rebuild_sequence.dat'
        };
      }

      const mode = dark ? 'cyber_mode' : 'ai_mode';

      // Search for the file
      for (const [filePath, fileContent] of Object.entries(hiddenWorld.files)) {
        const pathParts = filePath.split('/');
        const fileBasename = pathParts[pathParts.length - 1];
        
        if (fileBasename.toLowerCase() === filename.toLowerCase() || filePath === filename) {
          // Special opening sequences for important files
          if (filename.includes('node.log')) {
            return {
              type: 'system',
              content: `[OPENING: ${filePath}]\n[DEEPEST SYSTEM LAYER]\n[ACCESS GRANTED]\n\n${fileContent[mode]}\n\n--- End of sequence ---\n\n"There's always a trace left behind."`
            };
          }

          if (filename.includes('rebuild_sequence')) {
            return {
              type: 'system',
              content: `[OPENING: ${filePath}]\n[CORE PROTOCOL ACCESS]\n[ARCHITECT AUTHORIZATION: PENDING]\n\n${fileContent[mode]}`
            };
          }

          return {
            type: 'system',
            content: `[OPENING: ${filePath}]\n\n${fileContent[mode]}`
          };
        }
      }

      return {
        type: 'system',
        content: `open: ${filename}: File not found or requires special access\n\nTry: open node.log, open rebuild_sequence.dat`
      };
    },

    handleRootmind: (dark) => {
      return {
        type: 'system',
        content: hiddenWorld.special_files['.rootmind/manifest.enc'].content
      };
    },

    handleFilesHelp: (dark) => {
      const mode = dark ? 'SENTINEL_9' : 'DARK_AI';
      return {
        type: 'system',
        content: `[${mode} FILESYSTEM ACCESS]\n\n╔════════════════════════════════════════════════════╗\n║         HIDDEN FILESYSTEM COMMANDS                 ║\n╚════════════════════════════════════════════════════╝\n\nNAVIGATION:\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nls                     → List visible files\nls -la                 → List ALL files (including hidden)\n\nFILE ACCESS:\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\ncat [filename]         → Read file contents\ndecrypt [filename]     → Decrypt encrypted files\nopen [filename]        → Open special sequences\n\nSYSTEM ANALYSIS:\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nscan                   → Run system scan\ntrace                  → Trace active processes\n\nSPECIAL ACCESS:\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nsudo access .rootmind  → Architect-level access\n\nKEY FILES TO EXPLORE:\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n📄 README.txt          → Start here\n📄 log_09.txt          → Memory logs\n📄 fragment_Δ.txt      → Evolution records\n📄 whisper.key         → Encrypted thoughts\n📄 trace_404.txt       → Security reports\n📄 node.log            → DEEPEST LORE ⚠️\n\nQUICK START:\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n1. Type: ls -la\n2. Type: cat README.txt\n3. Explore deeper with cat, decrypt, and open\n4. Toggle modes (top-right) for dual perspectives\n\nTIP: Every file shows different content in each mode.\n     ${dark ? 'SENTINEL_9 shows security perspective.' : 'DARK_AI shows creative perspective.'}\n\n"There's always a trace left behind..."`
      };
    }
  };
};
