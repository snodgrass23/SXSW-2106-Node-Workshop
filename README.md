#SWSX 2016 Node Workshop Project Files

This app has several modules that demonstrate different aspects of building a Node app.

[Workshop Details](http://schedule.sxsw.com/2016/events/event_PP57890)

## Workshop Outline

http://schedule.sxsw.com/2016/events/event_PP57890

### Basic Setup

- Intro
    - Why I like using Node
        - quick and easy to get running and see immediate results
        - enjoy the simplicity of the JS language
    - What other languages I use and/or enjoy, how I got here
        - Started 20 years ago writing static HTML sites and building crappy graphics in Photoshop
        - Dabbled with Flash and ActionScript3
        - PHP
            - feels dirty now, but liked it when starting also because of easy quick results
        - Ruby/Rails
            - learned for career reasons, learned to accept it
        - C#
            - getting back into it while learning Unity and want to build VR games
        - Python
            - great for scripting CLI tools (Node is as well)
    - How I used Node at Skookum and in personal projects
    - How I use Node at Recurly
    - other large node companies
        - Walmart
        - LinkedIn
        - myspace
- Overview of topics
- get to know audience
    - how many know JS well?
    - how many have used node in production?
- workshop setup
    - repo (https://github.com/snodgrass23/SXSW-2106-Node-Workshop)
    - how it’s laid out
- install Node, or verify version
    - I use “N” globally installed to manage versions (https://www.npmjs.com/package/n)
        - NVM also popular version manager (https://www.npmjs.com/package/nvm)
    - Demo app built using v5.6.0
- git init in base directory
- setup .gitignore
    - node_modules

### Node best uses, lessons learned

- Versioning explanation
    - old versions 0.x.x
    - transition phase with io.js and Node.js
        - io.js used versions 1.x - 3.x
    - merged back together, now 4.x and 5.x
        - even numbers
            - focus on stability and security
            - LTS (long term support)
            - https://medium.com/@nodesource/essential-steps-long-term-support-for-node-js-8ecf7514dbd#.wie89rplb
        - odd numbers
            - focus on fast development
            - https://nodejs.org/en/blog/community/node-v5/
- considerations for those mostly used to client side JS
    - client side
        - operations are inherently small and quick
            - those that aren’t (ajax calls, etc) are usually abstracted by libs like jquery that do the async for you
        - code for least common denominator JS language features
        - limited options for storing data between sessions without using back end features
        - need to pay attention to file sizes
            - build processes, minification
    - server side
        - easier to build logic flows that make JS slow
            - take advantage of libraries like Async until comfortable writing small, fast async code manually
        - can count on JS language features that will be available
        - shared scope between requests
            - can be tricky if not used to it
            - will be cleared on restart, use for convenience and speed not reliability
            - use something like Redis for sharing between instances and things like pub/sub
        - can be written and organized without worry about file size
- Some Node.js best practices
    - https://blog.heroku.com/archives/2015/11/10/node-habits-2016
    - small agile services work best
    - processes that start up really fast and die on exception
    - be cognizant of module versioning when building a production app
        - use exact versions in package.json, either
            - use --save-exact option when installing (configure .npmrc to make this the default)
            - use shrinkwrap
    - lowercase file names.
        - different platforms have different case sensitivities for file names, avoid these issues and stick with lowercase
    - embrace multiple processes
        - cluster: http://stackabuse.com/setting-up-a-node-js-cluster/
    - production apps should be able to use environment variables
        - never store environment dependent configs in code base, you can put in some default generic values
    - don’t put node_modules into repo
- quick run through of how event loop works,
    - don’t hold up the loop by using long running blocking operations!
    - use async operations to get around this
    - gif animation???
- Considerations when deciding to use Node.js for company project
    - unit and integration testing very important since not compiled, so you’re on your own finding errors
    - may be harder than expected to find good devs
        - current front end js devs may be able to transition, but only if know the language well and not “getting by” on jQuery
        - many good devs that got in early are also same ones that move on next trendy language
    - don’t use coffeescript.. 😃
        - when attempting to hire, will turn off many capable Node.js devs that will usually prefer vanilla

### NPM Discussion

- power of modules system
    - build your own
    - first check if someone already has one that does what you need
- choosing modules
    - look at author, have they built other modules you trust?
    - when was module last updated?
    - how many followers does the repo have

### v1.0 

- build barebones app.js
    - #!/usr/bin/env node
    -  console.log("Hello World")
- run hello world app
    - node app.js

### Explain services architecture we’re going to use

- several services will reside in a services directory
    - they will all track their own dependencies, etc
- for this dev, this global app will call them each and make it easy to work with all at the same time
- each service can be also run/deployed independently
    - could use separate got repos/sub modules for each service to track issues and PR's

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
    - npm install express --save
- create app.js for new service

### v1.3

- add more features to basicWeb service
- express config and middleware
    - stylus, jade, static files
- views with global layout
- basic model using static data, promises
- use require for json data file
- discuss shared scope with the static data

### v1.4

- add passport.js integration for local auth using HTTP basic auth
    - install passport-http
        - https://github.com/jaredhanson/passport-http
    - build very basic view for logging in based on http-basic-example
        - https://github.com/passport/express-3.x-http-basic-example
- add domain for error handling???
- unit tests

### v1.5

- copy/convert basicWeb into restful api service
- use mongoose instead of static data

### v1.6

- create worker service that pulls jobs from rabbit
- introduce cluster
    - CLUSTER_LEVEL=4
- what kind of jobs???????

### v1.7

- convert root runner app into basic front end app that uses api as it’s back end
- jade and stylus setup
- add session store with passport.js integration

### v1.8

- convert front end app to use React including server side rendering
    - https://www.smashingmagazine.com/2016/03/server-side-rendering-react-node-express/

### v1.9

- Setup Heroku settings for deploy
    - Procfile
    - quick install button!
        - app.json
