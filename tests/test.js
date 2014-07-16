var grunt = require('grunt');
var fs = require('fs');
var chai = require('chai');


describe('grunt test', function(done) {

    it ("shall process template", function(done) {
        // hack to avoid loading a Gruntfile
        grunt.task.init = function() {};

        grunt.initConfig({
          'inject-file': {
            'process-html-template': {
              'options': {
                delimiterStart: '{{{',
                delimiterEnd: '}}}'
              },
              'files': {
                 'tests/index.html': ['tests/index.html.tpl']
              }
            }
          }
        });

        grunt.loadTasks('tasks');

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

    it ("shall process template with spaces", function(done) {
        // hack to avoid loading a Gruntfile
        grunt.task.init = function() {};

        grunt.initConfig({
          'inject-file': {
            'process-html-template': {
              'options': {
                delimiterStart: '{{{',
                delimiterEnd: '}}}'
              },
              'files': {
                 'tests/index2.html': ['tests/index2.html.tpl']
              }
            }
          }
        });

        grunt.loadTasks('tasks');

        grunt.tasks(['inject-file'], {}, function() {
          var actual = fs.readFileSync('tests/index2.html').toString(); 
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

