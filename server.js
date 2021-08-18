const express = require('express');
const fs = require('fs');
const Jimp = require('jimp');
const url = require('url');
const port = 8080;

const rutaHtml = './public/index.html';
const rutaCss = './public/style.css';
const app = express();

//app.use(express.static('public'))
app.get('/', (req, res) => {
    console.log(req.url);
    res.writeHead(200, { 'Content-Type': 'text/html' })
    fs.readFile(rutaHtml, 'utf8', (err, html) => {
        res.end(html)
    })
});

app.get('/public/style', (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/css' })
    fs.readFile(rutaCss, (err, css) => {
        res.end(css)
    })
});

app.get('/img', (req, res) => {
    randomImg = url.parse(req.url, true).query.img;
    Jimp.read(randomImg, (err, imagen) => {
        if (err) {
            console.log(err);
        }
        imagen
            .resize(350, Jimp.AUTO)
            .quality(60)
            .grayscale()
            .writeAsync(__dirname + '/public/newImg.jpg')
            .then(() => {
                fs.readFile('./public/newImg.jpg', (err, data) => {
                    if (err) {
                        console.log(err);
                    }
                    res.writeHead(200, { 'Content-Type': 'image/jpeg' })
                    res.end(data)
                });
            });
    });
});


app.listen(port, () => {
    console.log('Server running on port ' + port);
});