#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run build

# setup env
cd dist
echo 'harold.kim' > CNAME

# git commit
git init
git add .
git commit -m 'Deploying...'
git remote add origin https://github.com/stypr/stypr.github.io.git
git push -f --set-upstream origin master

cd -