#SWSX 2016 Node Workshop Project Files

This app has several modules that demonstrate different aspects of building a Node app.

[Workshop Details](http://schedule.sxsw.com/2016/events/event_PP57890)

[![Deploy](https://www.herokucdn.com/deploy/button.png)](https://heroku.com/deploy)

## Workshop Outline (headers are tags in repo)

### v1.0 

- build barebones app.js
    - #!/usr/bin/env node
    -  console.log("Hello World")
- run hello world app
    - node app.js

### v1.1

- move helloWorld app into services
    - rename to index.js for easier require statements
- update base app.js to now run services
    - brief interlude on scope
    - how the let variable declaration in the for loop is different
- again run node app
    - this time the hello world app is running on it’s own
    - the new Hello World service could also be run independently
        - cd services/helloWorld && node index.js

### v1.2

- create new basicWeb service
- build a base app package.json
    - npm init —yes
- build a basicWeb package.json
    - cd services/basicWeb && npm init --yes
    - add “main” property so that we can specify the app’s entry point
        - "main": "./app.js",
- install express in basicWeb
    - npm install express --save --save-exact
- create app.js for new service, add to main prop in package.js

### v1.3

- add more features to basicWeb service
- express config and middleware
    - stylus, jade, static files
- views with global layout
- basic model using static data, promises
- use require for json data file
- discuss shared scope with the static data

### v1.4

- add passport.js integration for local auth
    - install passport and passport-local
        - https://github.com/jaredhanson/passport
    - build very basic view for logging in based on http-basic-example
- unit tests

### v1.5

- refactor file organization a bit
- use mongoose instead of static data for models
- update views, routes, etc for register
- update tests for handling async mongoose calls in tests

### v1.6

- create worker service that pulls jobs from rabbit
- add cluster to web service
- add redis sessions

### v1.7

- Setup Heroku settings for deploy
    - Procfile
- show quick install button setup
    - app.json
