#!/bin/bash
# TKFM V3 Owner JS Auto-Check & Add
# Usage: ./owner-js-add.sh <filename.js>

JSFOLDER="./js"
FILE="$1"

if [ -z "$FILE" ]; then
  echo "Error: No filename provided. Usage: ./owner-js-add.sh filename.js"
  exit 1
fi

# Ensure js folder exists
if [ ! -d "$JSFOLDER" ]; then
  echo "js folder not found. Creating $JSFOLDER ..."
  mkdir "$JSFOLDER"
fi

# Full path to JS file
FULLPATH="$JSFOLDER/$FILE"

# Create file if not exists
if [ ! -f "$FULLPATH" ]; then
  echo "File $FULLPATH does not exist. Creating empty file ..."
  touch "$FULLPATH"
else
  echo "File $FULLPATH exists. Ready to overwrite/paste content."
fi

# Output full path for copy/paste
echo "$FULLPATH"
