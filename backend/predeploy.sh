echo ===== Initiating Deployment =====

# clear and rebuild
rm -r dist
vite build
echo ===== Build Completed =====

# cleanup package.json
node post-build.mjs
echo ===== Cleanup Completed =====

# copy files to prepare for deployment
cp ./Procfile ./dist
cp -R ./config ./dist
echo ===== Heroku Files Copied =====