# SampleApp

## To run

Ensure all nuget packages are installed for solution and debug via Visual Studio or deploying /App/ to IIS.

The /App/build/ folder contains all client-side files necessary to run index.html.  To modify and build the files from source, run 'npm install' at the root to install all dependant modules then run 'npm start' to build css and js files.

## Highlights

.Net Web Api 2 for REST endpoint for editing contacts.  Autofac for IoC and a single repository for managing contacts in memory.

Inferno js used for client side view framework with Redux for state management.  Gulp for client side build with browserify, uglify to package up the javascript.

Bootstrap 4 used to provide a quick theme.

## TODO

- Tidy up/unify client-side error handling
- Unit-tests (client & server-side)
- Bootstrap as a npm dependency to customise build and reduce download footprint
- Rip out bootstrap and add bespoke styling
- Add BindAs attributes for the Api action results returning interfaces
