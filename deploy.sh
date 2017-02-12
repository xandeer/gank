#!/usr/bin/env bash

ROOT=`pwd`
PUBLIC=${ROOT}/public
GH_PAGES=gh-pages
DIST_PATH=dist

function xandeerBuild() {
  npm install
  npm run build
}

function xandeerPush() {
  cd ${DIST_PATH}
  git init
  git config --global push.default simple
  git config user.name "xandeer"
  git config user.email "kkxandeer@gmail.com"
  git add --all
  git commit -m "update"
  git branch ${GH_PAGES}
  git checkout ${GH_PAGES}
  git remote add origin "https://${GH_TOKEN}@${GH_REF}"
  git push -uf origin ${GH_PAGES}
}
