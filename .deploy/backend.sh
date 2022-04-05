yarn workspace @ethics-olympiad/backend run predeploy
echo ===== Predeploy Completed =====

git subtree split -P backend/build -b deploy-backend
git push --force origin deploy-backend
echo ===== Pushed to Deployment Branch =====
