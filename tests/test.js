var grunt = require('grunt');
var fs = require('fs');
var chai = require('chai');


describe('grunt test', function(done) {
    it ("shall process template", function(done) {

        // hack to avoid loading a Gruntfile
        // You can skip this and just use a Gruntfile instead
        grunt.task.init = function() {};

        // Init config
        grunt.initConfig({
          'inject-file': {
            'process-html-template': {
              'options': {},
              'files': {
                 'tests/index.html': ['tests/index.html.tpl']
              }
            }
          }
        });

        // load task from file
        grunt.loadTasks('tasks');

        // Finally run the tasks, with options and a callback when we're done
        grunt.tasks(['inject-file'], {}, function() {
          var actual = fs.readFileSync('tests/index.html').toString(); 
          var expected = 
        '<html>\n' +
        '    <h1>Page header</h1>\n' +
        '\n' +
        '</html>\n';
          grunt.log.ok('Done running tasks.');
          chai.assert.equal(actual, expected);
          done();
        });
    });
});
