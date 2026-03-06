#!/bin/bash

git checkout main
echo "Building project..."
npm run build

# Create hostinger-out branch if it doesn't exist
if ! git show-ref --quiet refs/heads/hostinger-out; then
    git branch hostinger-out
fi

# Use worktree to check out hostinger-out branch into the folder
if [ ! -d "./hostinger-out" ]; then
    git worktree add ./hostinger-out hostinger-out
fi

echo "Copying build files..."
rm -rf ./hostinger-out/*
cp -r out/* ./hostinger-out/

# Commit and push main
git add .
git commit -m "Deploy $(date '+%Y-%m-%d %H:%M:%S')" || echo "No changes"
git push origin main

# Commit and push hostinger-out
cd ./hostinger-out
git add .
git commit -m "Deploy $(date '+%Y-%m-%d %H:%M:%S')" || echo "No changes"
git push origin hostinger-out

cd -
git checkout main
echo "Deployment complete."