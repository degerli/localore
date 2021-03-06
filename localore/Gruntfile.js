// Generated on 2015-12-17 using
// generator-webapp 1.1.0
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// If you want to recursively match all subfolders, use:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Automatically load required grunt tasks
  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin'
  });

  // Configurable paths
  var config = {
    app: 'localore',
    dist: 'localore/static/dist',
    html: 'localore/static/html'
  };

  // Define the configuration for all the tasks
  grunt.initConfig({

    // Project settings
    config: config,

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      // swig: {
      //   files: ['<%= config.app %>/{,*/}*.swig'],
      //   tasks: ['swig']
      // },
      sass: {
        files: ['<%= config.app %>/static/sass/{,*/}*.{scss,sass}'],
        tasks: ['sass', 'postcss']
      },
      styles: {
        files: ['<%= config.app %>/static/css/*.css'],
        // tasks: ['newer:copy:styles', 'postcss']
        tasks: ['postcss']
      },
      html: {
        files: ['<%= config.html %>/base.html'],
        tasks: ['clean:server', 'copy:server']
      }
    },

    browserSync: {
      options: {
        open: false,
        notify: false,
        background: true,
        watchOptions: {
          ignored: ''
        }
      },
      livereload: {
        options: {
          files: [
            // '.tmp/{,*/}*.html',
            // '<%= config.app %>/{,*/}*.html',
            // '<%= config.app %>/templates/base.html',
            '**/*.html',
            '<%= config.app %>/static/css/*.css',
            '<%= config.app %>/static/images/{,*/}*',
            '.tmp/scripts/{,*/}*.js',
            '!node_modules/**'
          ],
          // port: 9000,
          proxy: 'localhost:8000',
          watchTask: true
          // ,
          // server: {
          //   // baseDir: ['.tmp', config.app],
          //   routes: {
          //     '/bower_components': '../bower_components'
          //   }
          // }
        }
      },
      test: {
        options: {
          port: 9001,
          open: false,
          logLevel: 'silent',
          host: 'localhost',
          server: {
            baseDir: ['.tmp', './test', config.app],
            routes: {
              '/bower_components': './bower_components'
            }
          }
        }
      },
      dist: {
        options: {
          background: false,
          server: '<%= config.dist %>'
        }
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            // '.tmp',
            '<%= config.dist %>/*',
            '<%= config.app %>/templates/base.html'
            // '!<%= config.dist %>/.git',
            // '!<%= config.dist %>/.gitignore',
            // '!<%= config.dist %>/index.php'
          ]
        }]
      },
      server: {
        files: [{
          dot: true,
          src: [
            // '<%= config.app %>/static/css',
            '<%= config.app %>/templates/base.html'
          ]
        }]
      }
    },

    // Make sure code styles are up to par and there are no obvious mistakes
    eslint: {
      target: [
        'Gruntfile.js',
        '<%= config.app %>/scripts/{,*/}*.js',
        '!<%= config.app %>/scripts/vendor/*',
        'test/spec/{,*/}*.js'
      ]
    },

    // Compiles Sass to CSS and generates necessary files if requested
    sass: {
      options: {
        sourceMap: true,
        sourceMapEmbed: true,
        sourceMapContents: true
        ,
        includePaths: ['<%= config.app %>/static/bower_components/bourbon/app/assets/stylesheets', '<%= config.app %>/static', '<%= config.app %>/static/bower_components/bootstrap-sass/assets/stylesheets']
        // includePaths: ['.']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/static/sass',
          src: ['*.{scss,sass}'],
          dest: '<%= config.app %>/static/css',
          ext: '.css'
        }]
      }
    },

    postcss: {
      options: {
        map: true,
        processors: [
          // Add vendor prefixed styles
          // require('autoprefixer')({
          //   browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']
          // })
        ]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.dist %>/css/',
          src: '{,*/}*.css',
          dest: '<%= config.dist %>/css/'
        }]
      }
    },

    // Automatically inject Bower components into the HTML file
    wiredep: {
      app: {
        src: ['<%= config.html %>/base.html'],
        ignorePath: /^(\.\.\/)*\.\./,
        options: {
          fileTypes: {
            html: {
                replace: {
                    css: '<link rel="stylesheet" href="/static{{filePath}}" />',
                    js: '<script src="/static{{filePath}}"></script>'
                }
            }
          }
        }
      },
      sass: {
        src: ['<%= config.app %>/static/sass/{,*/}*.{scss,sass}'],
        ignorePath: /^(\.\.\/)+/,
        options: {
          fileTypes: {
              scss: {
                  replace: {
                      scss: '@import "../{{filePath}}";'
                  }
              }
          }
        }
      }
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= config.dist %>/js/{,*/}*.js',
          // '<%= config.dist %>/scripts/vendor.js',
          '<%= config.dist %>/css/{,*/}*.css',
          '<%= config.dist %>/images/{,*/}*.*'
          // ,
          // '<%= config.dist %>/styles/fonts/{,*/}*.*',
          // '<%= config.dist %>/images/*.{ico,png}'
        ]
      }
    },



    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      options: {
        dest: '<%= config.dist %>'
      },
      html: '<%= config.html %>/base.html'
    },

    // Performs rewrites based on rev and the useminPrepare configuration
    usemin: {
      options: {
        assetsDirs: [
          '<%= config.dist %>',
          '<%= config.dist %>/images',
          '<%= config.dist %>/css',
          '<%= config.dist %>/js'
        ],
        blockReplacements: {
          css: function (block) {
              var arr = {};
              for (var key in grunt.filerev.summary) {
                  arr[key.replace("localore/static/dist/", "")] = grunt.filerev.summary[key].replace("localore/static/", "");
              }

              var path = (arr[block.dest] !== undefined) ? arr[block.dest] : block.dest;

              return '<link rel="stylesheet" href="{% static \'' + path + '\' %}">';
          },
          js: function (block) {

            var arr = {};
            for (var key in grunt.filerev.summary) {
                arr[key.replace("localore/static/dist/", "")] = grunt.filerev.summary[key].replace("localore/static/", "");
            }

            var path = (arr[block.dest] !== undefined) ? arr[block.dest] : block.dest;

              return '<script type="text/javascript" src="{% static \'' + path + '\' %}"></script>';
          }
        }
      },
      html: ['<%= config.app %>/templates/base.html'],
      css: ['<%= config.dist %>/css/{,*/}*.css']
    },
    // html: ['<%= config.app %>/templates/*.html'],



    // The following *-min tasks produce minified files in the dist folder
    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/static/images',
          src: '{,*/}*.{gif,jpeg,jpg,png}',
          dest: '<%= config.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/static/images',
          src: '{,*/}*.svg',
          dest: '<%= config.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          conservativeCollapse: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          // true would impact styles with attribute selectors
          removeRedundantAttributes: false,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.dist %>',
          src: '{,*/}*.html',
          dest: '<%= config.dist %>'
        }]
      }
    },

    // By default, your `index.html`'s <!-- Usemin block --> will take care
    // of minification. These next options are pre-configured if you do not
    // wish to use the Usemin blocks.
    // cssmin: {
    //   dist: {
    //     files: {
    //       '<%= config.dist %>/styles/main.css': [
    //         '.tmp/styles/{,*/}*.css',
    //         '<%= config.app %>/styles/{,*/}*.css'
    //       ]
    //     }
    //   }
    // },
    // uglify: {
    //   dist: {
    //     files: {
    //       '<%= config.dist %>/scripts/scripts.js': [
    //         '<%= config.dist %>/scripts/scripts.js'
    //       ]
    //     }
    //   }
    // },
    // concat: {
    //   dist: {}
    // },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>/static/images',
          dest: '<%= config.dist %>/images',
          src: [
            '*.ico'
            // '/images/{,*/}*.webp',
            // 'static/images/{,*/}*.png',
            // 'templates/base.html',
            // 'styles/fonts/{,*/}*.*',
            // 'styles/ajax-loader.gif'
          ]
        },{
          expand: true,
          dot: true,
          cwd: '<%= config.html %>',
          dest: '<%= config.app %>/templates/',
          src: [
            'base.html'
          ]
        }]
      },
      server: {
        files:[{
          expand: true,
          dot: true,
          cwd: '<%= config.html %>',
          dest: '<%= config.app %>/templates/',
          src: [
            'base.html'
          ]
        }]
      }
    },

    // Run some tasks in parallel to speed up build process
    concurrent: {
      server: [
        // 'babel:dist',
        'sass'
      ],
      test: [
        'babel'
      ],
      dist: [
        // 'babel',
        'sass',
        'imagemin',
        'svgmin'
      ]
    }
  });


  grunt.registerTask('serve', 'start the server and preview your app', function (target) {

    if (target === 'dist') {
      return grunt.task.run(['build', 'browserSync:dist']);
    }

    grunt.task.run([
      'clean:server',
      'wiredep',
      'concurrent:server',
      'postcss',
      'copy:server',
      'browserSync:livereload',
      'watch'
    ]);
  });

  grunt.registerTask('server', function (target) {
    grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
    grunt.task.run([target ? ('serve:' + target) : 'serve']);
  });

  grunt.registerTask('test', function (target) {
    if (target !== 'watch') {
      grunt.task.run([
        'clean:server',
        'concurrent:test',
        'postcss'
      ]);
    }

    grunt.task.run([
      'browserSync:test',
      'mocha'
    ]);
  });

  grunt.registerTask('build', [
    'clean:dist',
    // 'swig:dist',
    'wiredep',
    'useminPrepare',
    'concurrent:dist',
    'postcss',
    'concat',
    'cssmin',
    'uglify',
    'copy:dist',
    'filerev',
    // 'remapFilerev',
    'usemin',
    // 'htmlmin'
  ]);

  grunt.registerTask('default', [
    'newer:eslint',
    'test',
    'build'
  ]);
};
