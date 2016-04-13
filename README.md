# fridge-controller-server
Contains the source code for the rest server for the raspberry pi fridge controller

Installation from scratch

Clone repo:
$ git clone https://github.com/mike-hewitson/fridge-controller-server.git
$ cd fridge-controller-server
$ npm install
$ sudo pm2 start ./bin/www

Update from repo
$ cd fridge-controller-server
$ git pull
$ npm install
$ sudo pm2 restart www

Envrionments
Environment valraibale for the rest server port and the mongo server ip and port are contaiend in the .env file. This is not contained in the repo.


