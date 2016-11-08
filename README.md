# fridge-controller-server
Contains the source code for the rest server for the raspberry pi fridge controller

## Running Tests

To run the mocha tests as well as report on test coverage, use the following command. Coverage reports can be viewed with the web interface.
```
$ gulp test
```
Make sure the mongo instance pointed to by the environment variables (see below) is up and running.

For testing the front end, run 

$ gulp lint
<!-- $ jasmine-node . -->

## Installation from scratch on main server

Clone repo:
$ git clone https://github.com/mike-hewitson/fridge-controller-server.git
$ cd pi-fridge-controller-server
$ npm install
If using  pm2:
$ sudo pm2 start ./bin/www
else
$npm start

Update from repo
$ cd pi-fridge-controller-server
$ git pull
$ npm install
If using  pm2:
$ sudo pm2 restart www
else
$npm start

## Environments

Environment variables for the rest server port and the mongo server ip and port are contained in the .env file. This is not contained in the repo. An example is:
```
DB_SERVER='CSJHBAN8G8WN.local'
DB_PORT='27017'
PORT='3000'
DB_USER='xxxxx'
DB_PSWD='xxxx'
```

