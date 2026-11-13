#!/usr/bin/env node
/**
 * Telo3 - Always-on engineering contract for AI coding agents.
 * Public API: context utilities + activation.
 * @author Jeet (@jeet1511)
 * @license MIT
 */
import { getVersion } from './src/version.js';
import { validateContext, REQUIRED_SECTIONS } from './src/validate.js';
import { initContext } from './src/init.js';
import { getStatus } from './src/status.js';
import { loadContext, TASK_MAP } from './src/context.js';
import { estimateTokens } from './src/tokens.js';
import { findContextDir, CONTEXT_DOCS } from './src/find-context.js';
import { activate, deactivate, renderContract } from './src/activate.js';
import { installSkill, AGENT_DIRS } from './src/install.js';
import { checkPortable } from './src/portable.js';
import { checkDesign } from './src/design-check.js';

export const version = getVersion();

export const templates = {
  prd: './templates/prd.md',
  architecture: './templates/architecture.md',
  rules: './templates/rules.md',
  design: './templates/design.md',
  tasks: './templates/tasks.md',
  memory: './templates/memory.md',
};

export const references = {
  antiSlop: './references/anti-slop.md',
  security: './references/security-quality.md',
  privacy: './references/privacy-compliance.md',
  legal: './references/legal-compliance.md',
  accessibility: './references/accessibility-quality.md',
  seo: './references/seo-quality.md',
  performance: './references/performance-quality.md',
  ui: './references/ui-quality.md',
  designSystem: './references/design-system.md',
  creativeStack: './references/creative-stack.md',
  tokens: './references/token-optimization.md',
  delegation: './references/smart-skill-delegation.md',
  specification: './references/document-specification.md',
  workflow: './references/workflow.md',
  behavior: './references/ai-behavior.md',
  audit: './references/project-audit.md',
};

export const skills = {
  main: './SKILL.md',
  bootstrap: './bootstrap/TELO3.md',
};

export function getTemplatePath(name) {
  return templates[name] || null;
}
export function getReferencePath(name) {
  return references[name] || null;
}
export function getSkillPath(name) {
  return skills[name] || null;
}

export {
  getVersion,
  validateContext,
  REQUIRED_SECTIONS,
  initContext,
  getStatus,
  loadContext,
  TASK_MAP,
  estimateTokens,
  findContextDir,
  CONTEXT_DOCS,
  activate,
  deactivate,
  renderContract,
  installSkill,
  AGENT_DIRS,
  checkPortable,
  checkDesign,
};

export default {
  version,
  templates,
  references,
  skills,
  getTemplatePath,
  getReferencePath,
  getSkillPath,
  getVersion,
  validateContext,
  initContext,
  getStatus,
  loadContext,
  estimateTokens,
  findContextDir,
  activate,
  deactivate,
  renderContract,
  installSkill,
  AGENT_DIRS,
  checkPortable,
  checkDesign,
};