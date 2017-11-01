# SampleApp

## To build

Ensure all nuget packages are installed.

/build/ folder contains files necessary to run index.html, to build the files from source, run 'npm install' to install all dependant modules then run 'npm start' to build css and js files.

## Highlights

.Net Web Api 2 for REST endpoint for editing contacts.  Autofac for IoC and a single repository for managing contacts in memory.

Inferno js used for client side view framework with Redux for state management.  Gulp for client side build with browserify, uglify to package up the javascript.

## TODO

- Tidy up/unify client-side error handling
- Unit-tests (client & server-side)
- Bootstrap as a npm dependency to customise build and reduce download footprint
- Theme & styling
