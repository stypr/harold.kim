#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn build

# setup env
cd src/.vitepress/dist
cp ../../../404.html 404.html
echo 'harold.kim' > CNAME

# git commit
git init
git add .
git commit -m 'Deploying...'
git remote add origin https://github.com/stypr/stypr.github.io.git
git push -f --set-upstream origin master

cd -