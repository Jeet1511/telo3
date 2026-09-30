#!/usr/bin/env node

/**
 * Telo3 - AI Development Framework
 * Project-context system for AI coding agents
 * 
 * @author Jeet (@jeet1511)
 * @license MIT
 */

export const version = '5.0.0';

export const templates = {
  prd: './templates/prd.md',
  architecture: './templates/architecture.md',
  rules: './templates/rules.md',
  design: './templates/design.md',
  tasks: './templates/tasks.md',
  memory: './templates/memory.md'
};

export const references = {
  security: './references/security-quality.md',
  privacy: './references/privacy-compliance.md',
  legal: './references/legal-compliance.md',
  accessibility: './references/accessibility-quality.md',
  seo: './references/seo-quality.md',
  performance: './references/performance-quality.md',
  ui: './references/ui-quality.md',
  tokens: './references/token-optimization.md',
  delegation: './references/smart-skill-delegation.md',
  specification: './references/document-specification.md',
  workflow: './references/workflow.md',
  behavior: './references/ai-behavior.md',
  audit: './references/project-audit.md'
};

export const skills = {
  main: './SKILL.md',
  onboarding: './ONBOARDING-SKILL.md',
  quickStart: './QUICK-START-ONBOARDING.md',
  context: './AI-CONTEXT.md'
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

export default {
  version,
  templates,
  references,
  skills,
  getTemplatePath,
  getReferencePath,
  getSkillPath
};
