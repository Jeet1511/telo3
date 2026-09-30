#!/usr/bin/env bash

#
# Project Context System Validation Script
#
# Validates project context documents for common issues.
# Usage: ./validate-project-context.sh [context-directory]
#

set -e

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Target directory
TARGET_DIR="${1:-.}"

# Find context directory
CONTEXT_DIRS=(
  "$TARGET_DIR/project-context"
  "$TARGET_DIR/docs/project-context"
  "$TARGET_DIR"
)

CONTEXT_DIR=""
for dir in "${CONTEXT_DIRS[@]}"; do
  if [ -f "$dir/prd.md" ] || [ -f "$dir/architecture.md" ]; then
    CONTEXT_DIR="$dir"
    break
  fi
done

if [ -z "$CONTEXT_DIR" ]; then
  echo -e "${RED}Error: Could not find project context directory${NC}"
  echo "Looked in:"
  for dir in "${CONTEXT_DIRS[@]}"; do
    echo "  - $dir"
  done
  exit 1
fi

echo "======================================"
echo "Project Context Validation"
echo "======================================"
echo ""
echo "Context directory: $CONTEXT_DIR"
echo ""

# Required files
REQUIRED_FILES=(
  "prd.md"
  "architecture.md"
  "rules.md"
  "design.md"
  "tasks.md"
  "memory.md"
)

ERRORS=0
WARNINGS=0

# Check for required files
echo "Checking required files..."
for file in "${REQUIRED_FILES[@]}"; do
  if [ -f "$CONTEXT_DIR/$file" ]; then
    echo -e "${GREEN}✓ Found: $file${NC}"
  else
    echo -e "${RED}✗ Missing: $file${NC}"
    ERRORS=$((ERRORS + 1))
  fi
done
echo ""

# Check for secret patterns
echo "Checking for accidental secrets..."
SECRET_PATTERNS=(
  "api_key"
  "API_KEY"
  "apiKey"
  "secret_key"
  "SECRET_KEY"
  "secretKey"
  "password.*=.*['\"]"
  "token.*=.*['\"]"
  "-----BEGIN.*PRIVATE KEY-----"
)

for file in "${REQUIRED_FILES[@]}"; do
  if [ -f "$CONTEXT_DIR/$file" ]; then
    for pattern in "${SECRET_PATTERNS[@]}"; do
      if grep -i -q "$pattern" "$CONTEXT_DIR/$file" 2>/dev/null; then
        echo -e "${YELLOW}⚠ Potential secret pattern in $file: $pattern${NC}"
        WARNINGS=$((WARNINGS + 1))
      fi
    done
  fi
done

if [ $WARNINGS -eq 0 ]; then
  echo -e "${GREEN}✓ No obvious secret patterns found${NC}"
fi
echo ""

# Check for placeholder content
echo "Checking for placeholders..."
PLACEHOLDER_COUNT=0
for file in "${REQUIRED_FILES[@]}"; do
  if [ -f "$CONTEXT_DIR/$file" ]; then
    COUNT=$(grep -c "\[.*\]" "$CONTEXT_DIR/$file" 2>/dev/null || true)
    if [ $COUNT -gt 5 ]; then
      echo -e "${YELLOW}⚠ $file has $COUNT placeholder sections${NC}"
      PLACEHOLDER_COUNT=$((PLACEHOLDER_COUNT + 1))
    fi
  fi
done

if [ $PLACEHOLDER_COUNT -eq 0 ]; then
  echo -e "${GREEN}✓ Files appear customized${NC}"
else
  echo -e "${YELLOW}Note: Some files have many placeholders. Consider customizing them.${NC}"
fi
echo ""

# Check file sizes (detect if they're still mostly template)
echo "Checking file sizes..."
for file in "${REQUIRED_FILES[@]}"; do
  if [ -f "$CONTEXT_DIR/$file" ]; then
    SIZE=$(wc -l < "$CONTEXT_DIR/$file")
    if [ $SIZE -lt 10 ]; then
      echo -e "${YELLOW}⚠ $file seems very short ($SIZE lines)${NC}"
      WARNINGS=$((WARNINGS + 1))
    fi
  fi
done
echo ""

# Summary
echo "======================================"
echo "Validation Summary"
echo "======================================"
echo ""

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
  echo -e "${GREEN}✓ All checks passed!${NC}"
  echo ""
  echo "Your project context appears valid."
  exit 0
elif [ $ERRORS -eq 0 ]; then
  echo -e "${YELLOW}⚠ Warnings: $WARNINGS${NC}"
  echo -e "${GREEN}✓ Errors: 0${NC}"
  echo ""
  echo "Your project context is valid but has some warnings."
  echo "Review the warnings above and address if needed."
  exit 0
else
  echo -e "${RED}✗ Errors: $ERRORS${NC}"
  echo -e "${YELLOW}⚠ Warnings: $WARNINGS${NC}"
  echo ""
  echo "Please address the errors above."
  exit 1
fi
