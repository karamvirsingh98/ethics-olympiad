# execute backend predeploy script
yarn workspace @ethics-olympiad/backend run predeploy
echo ===== Predeploy Completed =====

# push backend/dist to deployment branch
git subtree split -P backend/build -b deploy-backend
git push origin deploy-backend:deploy-backend --force
git branch -D deploy-backend
echo ===== Pushed to Deployment Branch =====
