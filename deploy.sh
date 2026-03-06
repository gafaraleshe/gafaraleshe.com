#!/bin/bash

git checkout main
echo "Building project..."
npm run build

echo "Clearing hostinger-out..."
rm -rf ./hostinger-out/*

echo "Copying build files..."
cp -r out/* ./hostinger-out/

# Commit main if needed
git add .
git commit -m "Deploy $(date '+%Y-%m-%d %H:%M:%S')" || echo "No changes"
git push origin main

# Make sure hostinger-out branch exists
if git show-ref --quiet refs/heads/hostinger-out; then
    git checkout hostinger-out
else
    git checkout -b hostinger-out
fi

echo "Deploying to hostinger-out..."
cd ./hostinger-out

git add .
git commit -m "Deploy $(date '+%Y-%m-%d %H:%M:%S')" || echo "No changes"
git push -u origin hostinger-out

cd -
git checkout main
echo "Deployment complete."