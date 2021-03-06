module.exports = (grunt) ->

  grunt.initConfig
    pkg: grunt.file.readJSON('package.json')
    develop:
      server:
        file: 'app.js'

    regarde:
      js:
        files: [
          'app.js'
          'routes/*.js'
        ]
        tasks: ['develop', 'delayed-livereload']

      'js-client':
        files: [
          'public/js/*.js'
        ]
        tasks: ['livereload']

      css:
        files: ['public/stylesheets/*.css']
        tasks: ['livereload']

      jade:
        files: ['views/{,*/}*.jade']
        tasks: ['livereload']

  grunt.registerTask 'delayed-livereload', 'delayed livereload', ->
    done = this.async()
    setTimeout ->
      grunt.task.run 'livereload'
      done()
    , 500

  grunt.loadNpmTasks 'grunt-develop'
  grunt.loadNpmTasks 'grunt-regarde'
  grunt.loadNpmTasks 'grunt-contrib-livereload'

  grunt.registerTask 'default', ['livereload-start', 'develop', 'regarde']
