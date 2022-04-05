# execute backend predeploy script
yarn workspace @ethics-olympiad/backend run predeploy
echo ===== Predeploy Completed =====

# push backend/dist to deployment branch
echo ===== Initiating Deployment =====

# split subtree
git subtree split -P backend/dist -b deploy-backend

# prepare subtree branch for deployment
git commit -a -m 'Deploying Backend'

# push subtree branch to origin to trigger heroku build
git push origin deploy-backend

# cleanup local branch
git branch -D deploy-backend
echo ===== Pushed to Deployment Branch =====
