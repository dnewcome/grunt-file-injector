module.exports = function(grunt) {

    var description = 'Squirt the contents of files into other files';

    grunt.registerMultiTask('inject-file', description, function() {
        // Merge task-specific and/or target-specific options with these defaults:
        var options = this.options({
            'data': {},
            'delimiterStart': '{{{',
            'delimiterEnd': '}}}'
        }),
            delimiterStart = options.delimiterStart,
            delimiterEnd = options.delimiterEnd;

        function process_template(template, templateOptions) {
            var regex = new RegExp(delimiterStart + '.*?' + delimiterEnd, 'g');
            var files = template.match(regex),
                i, file, replacement;

            if(files) {
                for(i = 0; i < files.length; i += 1) {
                    file = files[i].replace(delimiterStart, '').replace(delimiterEnd, '');
                    file = file.trim();
                    replacement = process_template(grunt.file.read(file));
                    template = template.replace(files[i], replacement);
                }
            }
            return template;
        }

        this.files.forEach(function(file) {
            // Concat specified files.
            var src = file.src.filter(function(filePath) {
                if (!grunt.file.exists(filePath)) {
                    grunt.log.warn('Source file `' + filePath + '` not found.');
                    return false;
                } else {
                    return true;
                }
            });

            if (!src.length) {
                grunt.log.warn(
                    'Destination `' + file.dest +
                    '` not written because `src` files were empty.'
                );
                return;
            }
            var template = src.map(function(filePath) {
                // Read file source.
                return grunt.file.read(filePath);
            }).join('\n');

            var templateOptions = {
                'data': typeof options.data == 'function' ?
                    options.data() :
                    options.data
            };

            if (options.delimiters) {
                templateOptions.delimiters = typeof options.delimiters == 'function' ?
                    options.delimiters() :
                    options.delimiters;
            }

            var result = process_template(template, templateOptions);

            // Write the destination file
            grunt.file.write(file.dest, result);
            grunt.log.writeln('File `' + file.dest + '` created.');
        });
    });
};


