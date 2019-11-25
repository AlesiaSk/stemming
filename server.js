const express = require('express');
const app = express();
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const pdf = require('pdf-parse');
const snowball = require('node-snowball');

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
        parsePDFFile(req.file.filename);
        return res.status(200).send(req.file)

    });

});

app.listen(8000, () => {
    console.log('App running on port 8000');
});

const parsePDFFile = (fileName) => {
    let dataBuffer = fs.readFileSync(path.resolve('files', fileName));
    pdf(dataBuffer).then((data) => {
        const text = data.text.toLowerCase().split(/\.|,|\\n|\?|!|:|-|;|\)|\(|\s|[0-9]/g).filter((word) => word !== '');

        if(text.includes('france')){
            franceStemming(text);
        }
        else {
            italyStemming(text);
        }
    });
};


const italyStemming = (text) => {
    const stemwords = snowball.stemword(stopWordsDeleting(text, true), 'italian');
    writeToFile(countRepeatingWords(stemwords).join(', '));
};

const franceStemming = (text) => {
    const stemwords = snowball.stemword(stopWordsDeleting(text, true), 'french');
    writeToFile(countRepeatingWords(stemwords).join(', '));
};

const countRepeatingWords = (wordsArray) => {

    const resultArray = [];
    let counter;

    for  (let i = 0; i < wordsArray.length; i++){
        counter = 1;
        for (let j = 0; j < wordsArray.length; j++) {
            if (wordsArray[i] === wordsArray[j]) {
                counter++;
            }
        }

        if (counter > 1){
            resultArray.push(`${wordsArray[i]} - ${counter}`);
        }
        else {
            resultArray.push(wordsArray[i]);
        }
    }
    return [...new Set(resultArray)];
};

const writeToFile = (text) => {
    fs.writeFile(`stemming-result/${Date.now()}-stemming.txt`, text, (err) => {
        if (err) throw err;
        console.log('Stemming ended!');
    });
};

const stopWordsDeleting = (words, french) => {

    const franchStopwords = ['alors',
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
        'Le',
        'Le',
        'les',
        'leur',
        'là',
        'Là',
        'La',
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

    const italianStopwords = [
        'a',
        'adesso',
        'ai',
        'al',
        'alla',
        'allo',
        'allora',
        'altre',
        'altri',
        'altro',
        'anche',
        'ancora',
        'avere',
        'aveva',
        'avevano',
        'ben',
        'buono',
        'che',
        'chi',
        'cinque',
        'comprare',
        'con',
        'consecutivi',
        'consecutivo',
        'cosa',
        'cui',
        'da',
        'del',
        'della',
        'dello',
        'dentro',
        'deve',
        'devo',
        'di',
        'doppio',
        'due',
        'e',
        'ecco',
        'fare',
        'fine',
        'fino',
        'fra',
        'gente',
        'giu',
        'ha',
        'hai',
        'hanno',
        'ho',
        'il',
        'indietro',
        'invece',
        'io',
        'la',
        'lavoro',
        'le',
        'lei',
        'lo',
        'loro',
        'lui',
        'lungo',
        'ma',
        'me',
        'meglio',
        'molta',
        'molti',
        'molto',
        'nei',
        'nella',
        'no',
        'noi',
        'nome',
        'nostro',
        'nove',
        'nuovi',
        'nuovo',
        'o',
        'oltre',
        'ora',
        'otto',
        'peggio',
        'pero',
        'persone',
        'piu',
        'poco',
        'primo',
        'promesso',
        'qua',
        'quarto',
        'quasi',
        'quattro',
        'quello',
        'questo',
        'qui',
        'quindi',
        'quinto',
        'rispetto',
        'sara',
        'secondo',
        'sei',
        'sembra',
        'sembrava',
        'senza',
        'sette',
        'sia',
        'siamo',
        'siete',
        'solo',
        'sono',
        'sopra',
        'soprattutto',
        'sotto',
        'stati',
        'stato',
        'stesso',
        'su',
        'subito',
        'sul',
        'sulla',
        'tanto',
        'te',
        'tempo',
        'terzo',
        'tra',
        'tre',
        'triplo',
        'ultimo',
        'un',
        'una',
        'uno',
        'va',
        'vai',
        'voi',
        'volte',
        'vostro'
    ];

    return french ? words.filter((word) => !franchStopwords.includes(word)) : words.filter((word) => !italianStopwords.includes(word));

};


