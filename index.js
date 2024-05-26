const http = require('http');   //create an http server
const fs = require('fs');       //create a file handler to read files
const path = require('path');   //create a path resolver

http.createServer((req, res) => {
    let url = req.url;

    //switch to resolve common pagename to filename
    switch(url){
        case '/':
            url =  'index.html';
            break;
        case '/about':
            url = 'about.html';
            break;
        case '/contact-me':
            url =  'contact-me.html';
            break;
        default:
            url = '404.html';
            break;
    }

    //resolve the full file path
    const filePath = path.join(__dirname, url);

    //error checking
    fs.readFile(filePath, (err, data) => {
        if (err) {
            if(err.code === 'ENOENT') {
                fs.readFile(__dirname + '/404.html', (_err, data) => {
                    res.end(data);
                });
            }
            else {
                res.statusCode = 500;
            res.end('Error loading file');
            }
        }
        else {
            res.end(data);
        }
    });
})

//server set to listen on port 5500
.listen(5500, () => {
    console.log('Server is listening on http://localhost:5500');
});