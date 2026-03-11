#!/bin/bash

echo "Building project..."
npm run build

echo "Pushing main..."
git add .
git commit -m "Deploy $(date '+%Y-%m-%d %H:%M:%S')" || echo "No changes"
git push origin main

echo "Deploying to hostinger-out branch..."
# Create a temp directory with just the out/ contents
cd out

# Force push just the out/ contents as the hostinger-out branch
git init
git add .
git commit -m "Deploy $(date '+%Y-%m-%d %H:%M:%S')"
git remote add origin git@github.com:gafitenison/gafaraleshe-portfolio
git push origin HEAD:hostinger-out --force

cd ..
rm -rf out/.git

echo "Done! hostinger-out branch has clean build files only."