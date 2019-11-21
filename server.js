const express = require('express');
const app = express();
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const pdf = require('pdf-parse');

app.use(cors());

app.post('/upload', (req, res) => {

    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
         // parsePDFFile();
        return res.status(200).send(req.file)

    });

});

app.listen(8000, () => {
    console.log('App running on port 8000');
});



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'files');
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}-${file.originalname}`;
        cb(null, fileName);
    }
});

const upload = multer({ storage: storage }).single('file');

const parsePDFFile = (fileName) => {
    let dataBuffer = fs.readFileSync(path.resolve('files', fileName));
    return (pdf(dataBuffer).then((data) =>
        (data.text.split(' '))
    ))
};
