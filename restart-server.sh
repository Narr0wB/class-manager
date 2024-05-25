#!/bin/bash

if (pm2 status manager | grep "online") > /dev/null
then 
  pm2 stop manager
else
  echo "Manager process was already stopped"
fi

{
  git pull origin master
  npm run build
  pm2 start manager
}
