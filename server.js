const express = require('express');
const app = express();
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');
const pdf = require('pdf-parse');

let fileName;

app.use(cors());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        fileName = Date.now() + '-' +file.originalname;
        cb(null, fileName);
        console.log('file', file);
    }
});

const upload = multer({ storage: storage }).single('file');

console.log(storage.getDestination);
app.post('/upload',function(req, res) {

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        return res.status(200).send(req.file)

    })

});


app.listen(8000, function() {
    console.log('App running on port 8000');
});

if(fileName) {
    const path = `/${fileName}`;
    let dataBuffer = fs.readFileSync(path);
    pdf(dataBuffer).then(function(data) {
        console.log(data.numpages);
        console.log(data.numrender);
        console.log(data.info);
        console.log(data.metadata);
        console.log(data.version);
        console.log(data.text);

    });
}

