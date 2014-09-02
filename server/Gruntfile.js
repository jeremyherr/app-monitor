module.exports = function(grunt) {

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		react: {
			dynamic_mappings: {
				files: [
					{
						expand: true,
						cwd: "public/js-src",
						src: ["**/*.js"],
						dest: "public/js",
						ext: ".js"
					}
				]
			}
		},
		browserify: {
			admin_page: {
				src: [ "./public/js/StatusPage.js" ],
				dest: "./public/js/bundle.js"
			}
		}

	});

	grunt.loadNpmTasks("grunt-react");
	grunt.loadNpmTasks("grunt-browserify");

	grunt.registerTask("default", ["react", "browserify"]);
};