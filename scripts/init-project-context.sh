#!/usr/bin/env bash

#
# Project Context System Initialization Script
# 
# Safely initializes project context documents without overwriting existing files.
# Usage: ./init-project-context.sh [target-directory]
#

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Script directory (where this script is located)
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PROJECT_CONTEXT_SYSTEM_DIR="$(dirname "$SCRIPT_DIR")"

# Target directory (where to create project context)
TARGET_DIR="${1:-.}"
TARGET_DIR="$(cd "$TARGET_DIR" && pwd)"

# Context directory options
CONTEXT_DIR_OPTIONS=(
  "project-context"
  "docs/project-context"
  "."
)

echo "=================================="
echo "Project Context System Initializer"
echo "=================================="
echo ""

# Check if templates directory exists
if [ ! -d "$PROJECT_CONTEXT_SYSTEM_DIR/templates" ]; then
  echo -e "${RED}Error: Templates directory not found at $PROJECT_CONTEXT_SYSTEM_DIR/templates${NC}"
  exit 1
fi

# Determine context directory
CONTEXT_DIR=""
for dir in "${CONTEXT_DIR_OPTIONS[@]}"; do
  if [ -f "$TARGET_DIR/$dir/prd.md" ] || [ -f "$TARGET_DIR/$dir/architecture.md" ]; then
    CONTEXT_DIR="$TARGET_DIR/$dir"
    echo -e "${GREEN}✓ Found existing context at: $dir${NC}"
    break
  fi
done

# If no existing context found, ask user where to create
if [ -z "$CONTEXT_DIR" ]; then
  echo "Where should project context be created?"
  echo "1) project-context (recommended - clean separation)"
  echo "2) docs/project-context (integrated with documentation)"
  echo "3) . (project root - minimal structure)"
  read -p "Choose [1-3, default: 1]: " choice
  
  case $choice in
    2) CONTEXT_DIR="$TARGET_DIR/docs/project-context" ;;
    3) CONTEXT_DIR="$TARGET_DIR" ;;
    *) CONTEXT_DIR="$TARGET_DIR/project-context" ;;
  esac
fi

echo ""
echo "Target directory: $CONTEXT_DIR"
echo ""

# Create context directory if it doesn't exist
if [ ! -d "$CONTEXT_DIR" ]; then
  echo -e "${YELLOW}Creating directory: $CONTEXT_DIR${NC}"
  mkdir -p "$CONTEXT_DIR"
fi

# Template files to copy
TEMPLATES=(
  "prd.md"
  "architecture.md"
  "rules.md"
  "design.md"
  "tasks.md"
  "memory.md"
)

# Copy templates
CREATED=0
SKIPPED=0

for template in "${TEMPLATES[@]}"; do
  SOURCE="$PROJECT_CONTEXT_SYSTEM_DIR/templates/$template"
  DEST="$CONTEXT_DIR/$template"
  
  if [ -f "$DEST" ]; then
    echo -e "${YELLOW}⊗ Skipped (exists): $template${NC}"
    SKIPPED=$((SKIPPED + 1))
  elif [ -f "$SOURCE" ]; then
    cp "$SOURCE" "$DEST"
    echo -e "${GREEN}✓ Created: $template${NC}"
    CREATED=$((CREATED + 1))
  else
    echo -e "${RED}✗ Template not found: $template${NC}"
  fi
done

echo ""
echo "=================================="
echo "Initialization Complete"
echo "=================================="
echo ""
echo -e "${GREEN}Created: $CREATED files${NC}"
echo -e "${YELLOW}Skipped: $SKIPPED files (already exist)${NC}"
echo ""

if [ $CREATED -gt 0 ]; then
  echo "Next steps:"
  echo "1. Review and customize the created files"
  echo "2. Fill in project-specific information"
  echo "3. Remove placeholder sections not needed"
  echo "4. Tell your AI agent to use SKILL.md from project-context-system"
  echo ""
  echo "Example AI instruction:"
  echo "  'Use the project-context-system skill. Read $CONTEXT_DIR before making changes.'"
  echo ""
fi

if [ $SKIPPED -gt 0 ]; then
  echo -e "${YELLOW}Note: Existing files were preserved. To reinitialize, delete or rename them first.${NC}"
  echo ""
fi

echo "Validation:"
echo "  Run: $SCRIPT_DIR/validate-project-context.sh"
echo ""

exit 0
