import fs from 'fs/promises';
import zlib from 'zlib';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export const compress = async (dirPath) => {
    try {
        const filePath = path.join(dirPath);
        const compressedFilePath = path.join(filePath + '.br');
        const readStream = fs.create
        const writeStream = fs.createWriteStream(compressedFilePath);
        const brotli = zlib.createBrotliCompress();
        const stream = readStream.pipe(brotli).pipe(writeStream);
        stream.on('finish', () => {
            console.log('Done compressing 😎');
        });
    } catch (err) {
        throw new Error('FS operation failed');
    }
};
//compress();

// Create read and write streams
//const readStream = fs.createReadStream(READ_FILE_NAME);
//const writeStream = fs.createWriteStream(WRITE_FILE_NAME);

// Create brotli compress object
//const brotli = zlib.createBrotliCompress();

// Pipe the read and write operations with brotli compression
//const stream = readStream.pipe(brotli).pipe(writeStream);

//stream.on('finish', () => {
 //   console.log('Done compressing 😎');
//});