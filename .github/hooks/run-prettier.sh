#!/bin/bash
# Only run prettier when a file was created or edited.
# The hook runner pipes the tool result JSON to stdin.
TOOL_NAME=$(node -e "
  let data = '';
  process.stdin.on('data', chunk => data += chunk);
  process.stdin.on('end', () => {
    try { console.log(JSON.parse(data).toolName); } catch (e) {}
  });
")

if [ "$TOOL_NAME" = "create" ] || [ "$TOOL_NAME" = "edit" ]; then
  npx prettier --write .
fi
