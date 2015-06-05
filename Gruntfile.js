// Generated on 2015-06-03 using generator-angular 0.11.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Configurable paths for the application
  var appConfig = {
    app: 'server'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      js: {
        files: ['app/**/*.js'],
        tasks: ['newer:jshint:all']
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 8081,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost'
      }
    }
  });
};
