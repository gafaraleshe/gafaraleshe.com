#!/bin/zsh
# =======================================
# Next.js Deployment: main -> gh-pages -> Hostinger
# =======================================

# 1️⃣ Switch to main and pull latest
echo "Switching to main branch..."
git checkout main
git pull origin main

# 2️⃣ Install dependencies (if needed)
#echo "Installing dependencies..."
#npm install

# 3️⃣ Build static /out folder
echo "Building /out..."
npm run export

# 4️⃣ Copy contents of /out to temporary folder
echo "Copying /out contents to temporary folder..."
TEMP_DIR=$(mktemp -d)
cp -r out/* "$TEMP_DIR"/

# 5️⃣ Switch to gh-pages branch
echo "Switching to gh-pages branch..."
git checkout gh-pages

# 6️⃣ Remove old files in gh-pages
echo "Removing old files from gh-pages..."
git rm -r * 2>/dev/null || true

# 7️⃣ Copy new build into gh-pages root
echo "Copying new build from temp folder..."
cp -r "$TEMP_DIR"/* ./


# 8️⃣ Commit and push changes
echo "Committing and pushing updates to gh-pages..."
git add .
git commit -m "Deploy latest /out build" || echo "No changes to commit"
git push origin gh-pages

# 9️⃣ Clean up temporary folder
rm -rf $TEMP_DIR

# 10️⃣ Switch back to main branch
git checkout main

echo "✅ Deployment complete! /out synced to gh-pages for Hostinger."