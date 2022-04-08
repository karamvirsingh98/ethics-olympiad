# switch to deployment branch
git checkout deploy-events

# merge in changes from main
git merge main

# push changes to deployment branch
git add -A
git push origin deploy-events

# return to main branch
git checkout main
