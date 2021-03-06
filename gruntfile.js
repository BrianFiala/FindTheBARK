'use strict';

module.exports = function (grunt) {

  grunt.initConfig({

    clean: ['build/'],

    jshint: {
      source: {
        options: {
          jshintrc: '.jshintrc'
        },
        files: {
          src: ['src/**/*.js']
        }
      }
    },

    copy: {
      html: {
        files: [{
            expand: true,
            cwd: 'src/frontend/',
            src: 'index.html',
            dest: 'build/'
          },
          {
            expand: true,
            cwd: 'src/frontend/',
            src: ['views/**/*.template.html'],
            dest: 'build/'
          }
        ]
      },
      allImages: {
        files: [{
          cwd: 'src/frontend/img',
          src: ['*.jpg', '*.png'],
          dest: 'build/img/',
          expand: true
        }]
      },
      angular: {
        files: [{
            cwd: 'node_modules/angular',
            src: ['angular.js'],
            dest: 'build/js/',
            expand: true
          },
          {
            cwd: 'node_modules/angular-ui-router/release',
            src: ['angular-ui-router.js'],
            dest: 'build/js/',
            expand: true
          }
        ]
      }
    },

    sass: {
      allSASS: {
        files: {
          'build/style.css': 'src/frontend/sass/main.scss'
        }
      }
    },

    concat: {
      dist: {
        src: ['src/frontend/js/park.module.js', 'src/frontend/js/**/*.js'],
        dest: 'build/js/app.js'
      }
    },

    babel: {
      all: {
        options: {
          sourceMap: true,
          presets: ['es2015']
        },
        files: {
          'build/js/app.js': 'build/js/app.js'
        }
      }
    },

    watch: {
      css: {
        files: ['src/frontend/sass/*.scss'],
        tasks: ['sass']
      },
      html: {
        files: ['src/frontend/index.html', 'src/frontend/views/**/*.html'],
        tasks: ['copy']
      },
      js: {
        files: ['src/frontend/js/*.js'],
        tasks: ['concat', 'babel']
      }
    }
  });

  require('load-grunt-tasks')(grunt);

  grunt.registerTask('default', ['jshint', 'clean', 'concat', 'babel', 'copy', 'sass']);
};