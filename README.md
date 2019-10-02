Vega Server
-----------

An API to sync data from Vega App (https://github.com/shakhassan/vega) to cloud. Vega Server will handle data syncing when user save a new request, including offline data. Vega Server is currently using MongoDB as data storage.

![alt tag](https://raw.githubusercontent.com/shakhassan/vega-server/master/Screen%20Shot%202017-04-04%20at%2010.17.02%20AM.png)

Components
----------

1. Express
1. Socket.io
1. MongoDB

Getting Started
---------------
```
#Get the latest snapshot
git clone https://github.com/shakhassan/vega-server.git

#Change directory
cd vega-server

#Install NPM dependencies
npm install

#Then simply start app
node index.js
```
