module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		react: {
			dynamic_mappings: {
				files: [
					{
						expand: true,
						cwd: 'public/js-src',
						src: ['**/*.js'],
						dest: 'public/js',
						ext: '.js'
					}
				]
			}
		},
	});

	grunt.loadNpmTasks('grunt-react');

	grunt.registerTask('default', ['react']);
};