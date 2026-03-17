#!/bin/bash

echo "--------------------------------------"
echo "TKFM PRE-DEPLOY DIAGNOSTIC"
echo "--------------------------------------"

echo ""
echo "1️⃣ Node version"
node -v

echo ""
echo "2️⃣ Netlify folder size"
du -sh netlify

echo ""
echo "3️⃣ Engines folder size"
du -sh netlify/engines

echo ""
echo "4️⃣ Functions folder size"
du -sh netlify/functions

echo ""
echo "5️⃣ node_modules size"
du -sh node_modules

echo ""
echo "6️⃣ Engine count"
ls netlify/engines | wc -l

echo ""
echo "7️⃣ Checking missing dependencies"
npm ls --depth=0 2>/dev/null

echo ""
echo "8️⃣ Largest folders"
du -h --max-depth=1 | sort -hr | head -n 10

echo ""
echo "--------------------------------------"
echo "Diagnostic complete"
echo "--------------------------------------"
