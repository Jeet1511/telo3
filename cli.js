#!/usr/bin/env node

/**
 * Telo3 CLI
 * Command-line interface for Telo3 project initialization
 * 
 * @author Jeet (@jeet1511)
 * @license MIT
 */

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { spawn } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const args = process.argv.slice(2);
const command = args[0];

function showHelp() {
  console.log(`
Telo3 - AI Development Framework
Usage: telo3 <command>

Commands:
  init        Initialize Telo3 project context
  validate    Validate existing project context
  version     Show Telo3 version
  help        Show this help message

Examples:
  telo3 init              Initialize project context
  telo3 validate          Validate project structure
  telo3 version           Show version

Documentation:
  https://github.com/Jeet1511/telo3

Created by Jeet (@jeet1511)
`);
}

function showVersion() {
  console.log('Telo3 v5.0.0');
}

function runScript(scriptName) {
  const scriptPath = join(__dirname, 'scripts', `${scriptName}.sh`);
  
  const proc = spawn('bash', [scriptPath], {
    stdio: 'inherit',
    cwd: process.cwd()
  });

  proc.on('error', (err) => {
    console.error(`Error running ${scriptName}:`, err.message);
    process.exit(1);
  });

  proc.on('exit', (code) => {
    process.exit(code || 0);
  });
}

switch (command) {
  case 'init':
    runScript('init-project-context');
    break;
  case 'validate':
    runScript('validate-project-context');
    break;
  case 'version':
    showVersion();
    break;
  case 'help':
  case undefined:
    showHelp();
    break;
  default:
    console.error(`Unknown command: ${command}`);
    console.error('Run "telo3 help" for usage information');
    process.exit(1);
}
