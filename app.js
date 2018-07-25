const urls = require('./url-array.js');
const fs = require('fs');
const path = './urllist-redirects.txt';

fs.open(path, 'w', function(err, fd) {  
    if (err) throw 'could not open file: ' + err;

    let urlsToWrite = urls.map(url => { return url + '\n' });
    
    fs.write(fd, urlsToWrite, 0, urlsToWrite.length, function(err) {
        if (err) throw 'error writing file: ' + err;
        fs.close(fd, function() {
            console.log('wrote the file successfully');
        });
    });
});