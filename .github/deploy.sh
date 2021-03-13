#!/bin/bash

# any future command that fails will exit the script
set -e

# Lets write the public key of our aws instance
eval $(ssh-agent -s)
echo "$TARGET_SERVER_SECRET_KEY_BASE64" | tr -d '\r' | ssh-add - > /dev/null

# let's test the ssh connection we need for pm2 to work
echo "Test ssh connection"
ssh -o StrictHostKeyChecking=no -T "$TARGET_SERVER_USER@$TARGET_SERVER_HOST"

# we need to initialize a repo because of some strange behaviours of pm2...
git init

# first we try to setup the project
echo "Setup tagget server directories"
pm2 deploy ecosystem.config.js production setup 2>&1 || true

# second we try to update the project
echo "make deploy"
pm2 deploy ecosystem.config.js production update
