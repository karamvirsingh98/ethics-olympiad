# switch to deployment branch
git checkout deploy-manager

# merge in changes from main
git merge main

# push changes to deployment branch
git add -A
git commit -m 'Deploying Manager'
git push origin deploy-manager

# return to main branch
git checkout main
