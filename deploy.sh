
git checkout main
echo "Building project..."
npm run build && npm run export

echo "Clearing hostinger-out..."
rm -rf ../hostinger-out/*

echo "Copying build files..."
cp -r out/* ../hostinger-out/
git add .
git commit -m "Deploy $(date '+%Y-%m-%d %H:%M:%S')"
git push origin main

git checkout hostinger-out

echo "Deploying..."
cd ../hostinger-out
cp -r ../hostinger-out/* gafaraleshe-porttfolio/
git add .
git commit -m "Deploy $(date '+%Y-%m-%d %H:%M:%S')"
git push origin hostinger-out

cd -
echo "Deployment complete."