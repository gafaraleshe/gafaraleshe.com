

#!/bin/bash

git checkout main
echo "Building project..."
npm run build && npm run export

echo "Clearing hostinger-out..."
rm -rf ../hostinger-out/*

echo "Copying build files..."
cp -r out/* ../hostinger-out/

# Commit main if needed
git add .
git commit -m "Deploy $(date '+%Y-%m-%d %H:%M:%S')" || echo "No changes"
git push origin main

# ====== FIX START ======
# Make sure hostinger-out branch exists locally
if git show-ref --quiet refs/heads/hostinger-out; then
    git checkout hostinger-out
else
    git checkout -b hostinger-out
fi
# ====== FIX END ======

echo "Deploying..."
# Go into your hostinger-out folder (this is the build folder)
cd ../hostinger-out

# Copy files into the branch root (contents only)
cp -r * ../gafaraleshe-portfolio/

# Stage, commit, push
git add .
git commit -m "Deploy $(date '+%Y-%m-%d %H:%M:%S')" || echo "No changes"
git push -u origin hostinger-out

# Return to main
cd -
git checkout main

echo "Deployment complete."
#git stash push -u
#git checkout main
#git stash pop