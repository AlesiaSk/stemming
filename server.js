const express = require('express');
const app = express();
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const pdf = require('pdf-parse');

app.use(cors());

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

app.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        } else if (err) {
            return res.status(500).json(err)
        }
        console.log(parsePDFFile(req.file.filename));
        return res.status(200).send(req.file)

    });

});

app.listen(8000, () => {
    console.log('App running on port 8000');
});

const parsePDFFile = (fileName) => {
    let dataBuffer = fs.readFileSync(path.resolve('files', fileName));
    pdf(dataBuffer).then((data) => {
        const text = data.text.split('');

        if(data.text.includes('France')){
            franceStemming(text);
        }
        else {
            italyStemming(text);
        }
    });
};


const italyStemming = (text) => {

};

const franceStemming = (text) => {
    franceStopWordsDeleting(text);
};

const franceStopWordsDeleting = (words) => {

    const stopwords = ['alors',
        'au',
        'aucuns',
        'aussi',
        'autre',
        'avant',
        'avec',
        'avoir',
        'bon',
        'car',
        'ce',
        'cela',
        'ces',
        'ceux',
        'chaque',
        'ci',
        'comme',
        'comment',
        'dans',
        'des',
        'du',
        'dedans',
        'dehors',
        'depuis',
        'devrait',
        'doit',
        'donc',
        'dos',
        'début',
        'elle',
        'elles',
        'en',
        'encore',
        'essai',
        'est',
        'et',
        'eu',
        'fait',
        'faites',
        'fois',
        'font',
        'hors',
        'ici',
        'il',
        'ils',
        'la',
        'le',
        'les',
        'leur',
        'là',
        'ma',
        'maintenant',
        'mais',
        'mes',
        'mine',
        'moins',
        'mon',
        'mot',
        'même',
        'ni',
        'nommés',
        'notre',
        'nous',
        'ou',
        'où',
        'par',
        'parce',
        'pas',
        'peut',
        'peu',
        'plupart',
        'pour',
        'pourquoi',
        'quand',
        'que',
        'quel',
        'quelle',
        'quelles',
        'quels',
        'qui',
        'sa',
        'sans',
        'ses',
        'seulement',
        'si',
        'sien',
        'son',
        'sont',
        'sous',
        'soyez',
        'sujet',
        'sur',
        'ta',
        'tandis',
        'tellement',
        'tels',
        'tes',
        'ton',
        'tous',
        'tout',
        'trop',
        'très',
        'tu',
        'voient',
        'vont',
        'votre',
        'vous',
        'vu',
        'ça',
        'étaient',
        'état',
        'étions',
        'été',
        'être'];

};
