install:
	npm install

server:
	node app.js

deploy:
	git push heroku master
