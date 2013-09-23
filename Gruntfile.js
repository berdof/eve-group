module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                    "js/vendors/jquery.min.js",
                    "js/bootstrap/bootstrap-dropdown.js",
                    "js/bootstrap/bootstrap-modal.js",
                    "js/bootstrap/bootstrap-tooltip.js",
                    "js/bootstrap/bootstrap-popover.js",
                    "js/bootstrap/bootstrap-transition.js",
                    "js/bootstrap/bootstrap-typeahead.js",
                    "js/vendors/chosen.jquery.min.js",
                    "js/vendors/icheck.js",
                    "js/vendors/jquery-ui-1.10.3.custom.min.js",
                    "js/vendors/jquery.cycle.all.js",
                    "js/vendors/jquery.event.swipe.js",
                    "js/vendors/jquery.maskedinput.min.js",
                    "js/vendors/jquery.mousewheel.js",
                    "js/vendors/jquery.placeholder.js",
                    "js/vendors/jquery.slider.js",
                    "js/vendors/jquery.timeMask.js",
                    "js/vendors/knockout-2.3.0.js",
                    "js/vendors/knockout.mapping.js",
                    "js/CareTribe.js"
                ],
                dest: 'js/all.js'
            }
        },

        uglify: {
            options: {
                banner: '/*! <%= pkg.name %>\n Build date: <%= grunt.template.today("yyyy-mm-dd") %> \n'+
                "Includes:\n"+
                 "js/vendors/jquery.min.js\n"+
                "js/bootstrap/bootstrap-dropdown.js\n"+
                "js/bootstrap/bootstrap-modal.js\n"+
                "js/bootstrap/bootstrap-tooltip.js\n"+
                "js/bootstrap/bootstrap-popover.js\n"+
                "js/bootstrap/bootstrap-transition.js\n"+
                "js/bootstrap/bootstrap-typeahead.js\n"+
                "js/vendors/chosen.jquery.min.js\n"+
                "js/vendors/icheck.js\n"+
                "js/vendors/jquery-ui-1.10.3.custom.min.js\n"+
                "js/vendors/jquery.cycle.all.js\n"+
                "js/vendors/jquery.event.swipe.js\n"+
                "js/vendors/jquery.maskedinput.min.js\n"+
                "js/vendors/jquery.mousewheel.js\n"+
                "js/vendors/jquery.placeholder.js\n"+
                "js/vendors/jquery.slider.js\n"+
                "js/vendors/jquery.timeMask.js\n"+
                "js/vendors/knockout-2.3.0.js\n"+
                "js/vendors/knockout.mapping.js\n"+
                "js/CareTribe.js */ \n"
            },
            build: {
                src: 'js/all.js',
                dest: 'js/all.min.js'
            }
        },imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd:"images",
                    src: '**/*.{png,jpg,jpeg}',
                    dest: 'imagesNew/'
                }]
            }
        }

    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
   // grunt.loadNpmTasks('grunt-contrib-imagemin');
    // Default task(s).
    grunt.registerTask('default', ['concat','uglify']);

};