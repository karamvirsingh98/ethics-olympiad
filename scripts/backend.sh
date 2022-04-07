# execute backend predeploy script
yarn workspace @ethics-olympiad/backend run predeploy
echo ===== Predeploy Completed =====

#stash changes in main for a clean subtree split
git stash

# push backend/dist to deployment branch
echo ===== Initiating Deployment =====

# split subtree
git subtree split -P backend/dist -b deploy-backend

# prepare subtree branch for deployment
git checkout deploy-backend
git add -A
git commit -m 'Deploying Backend'

# push subtree branch to origin to trigger heroku build
git push origin deploy-backend:deploy-backend --force
echo ===== Initiating Deployment =====

# cleanup local branch
git checkout main
git branch -D deploy-backend
rm -r backend/dist
git stash pop
echo ===== Pushed to Deployment Branch =====
