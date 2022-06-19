echo ===== Initiating Deployment =====

# clear and rebuild
rm -r dist
yarn run vite build
echo ===== Build Completed =====

# cleanup package.json
node post-build.mjs
echo ===== Cleanup Completed =====

# build and push container to heroku registry
heroku container:push web -a ethicsolympiad
echo ===== Container Built and Pushed =====

# release container to wbe
heroku container:release web -a ethicsolympiad
echo ===== Container Released on Heroku =====