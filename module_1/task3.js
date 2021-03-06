import fs from 'fs';
import csv from 'csvtojson';
import readline from 'readline';
import { pipeline } from 'stream';

// task 1

const rl = readline.createInterface({ input: process.stdin });

rl.on('line', (input) => {
    const output = input.split('').reverse().join('');
    console.log(output);
});

// task 2

const CSV_PATH = './csv/books.csv';
const csvOptions = {
    noheader: false,
    headers: ['book', 'author', 'amount', 'price'],
    colParser: {
        'amount': function (item) { return +item },
        'price': function (item) { return +item }
    }
};

//Load all content into RAM

csv(csvOptions).fromFile(CSV_PATH)
    .then((csvObject) => {
        const books = formattedData(csvObject);
        fs.writeFileSync('file1.txt', books, (error) => {
            if (error) {
                console.log(`error: ${error}`);
            }
        })
    });


const formattedData = (data) => {
    if (Array.isArray(data)) {
        return data.map(rowObj => (JSON.stringify(rowObj))).join('\r\n');
    }
}

//Do not load all content into RAM

//readline method

function processFileReadline(readStream, writeStream) {
    const lineReader = readline.createInterface({ input: csv(csvOptions).fromStream(readStream) });

    lineReader.on('line', (line) => {
        writeStream.write(line + '\r\n')
    });
}

//pipeline method

function processFilePipeline(readStream, writeStream) {
    pipeline(
        csv(csvOptions).fromStream(readStream),
        writeStream,
        (error) => {
            console.log(`error: ${error}`);
        }
    );
}

const readStream = fs.createReadStream(CSV_PATH);
const writeStreamReadline = fs.createWriteStream('file2.txt');
const writeStreamPipeline = fs.createWriteStream('file3.txt');

processFileReadline(readStream, writeStreamReadline);
processFilePipeline(readStream, writeStreamPipeline);
