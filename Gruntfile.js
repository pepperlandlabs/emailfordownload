module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
        sass: {
            files: ['styles/*.{scss,sass}'],
            tasks: ['sass:dist']
        },
        options: {
          // livereload: true
        },
    },
    sass: {
        dist: {
            files: {
                'public/css/main.css': 'styles/main.scss',
            },
            options: {
                sourcemap: 'true',
                includePaths: [
                  // 'bower_components/zen-grids/'
                ]
            }
        }
    }
  });

  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks('grunt-sass');

  grunt.registerTask('default', ['sass:dist', 'watch']);
};