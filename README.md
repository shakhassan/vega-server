Vega Server
-----------

An API to sync data from Vega App (https://github.com/shakhassan/vega) to cloud. Vega Server will handle data syncing when user save a new request, including offline data. Vega Server is currently using MongoDB as data storage.

Components
----------

1- Express
2- Socket.io
3- MongoDB

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

