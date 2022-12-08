import { createReadStream, createWriteStream } from 'fs';
import zlib from 'zlib';
import path from 'path';
import { EOL } from 'os';
import { doesExist, getAbsolutePath } from '../utils/doesExist.js';
import { closeMessage } from '../utils/closeMessage.js';

export const compress = async (filePath, cwd) => {
    const absolutePath = getAbsolutePath(filePath, cwd);
    const doesExistPath = await doesExist(absolutePath);
    if (doesExistPath) {
        try {
            const compressedFilePath = path.join(absolutePath + '.br');
            const readableStream = createReadStream(absolutePath);
            const writebleStream = createWriteStream(compressedFilePath);
            const brotli = zlib.createBrotliCompress();
            const stream = readableStream.pipe(brotli).pipe(writebleStream);
            stream.on('finish', () => {
                process.stdout.write(`${EOL} Done compressing 😎`);
                closeMessage(cwd);
            });
        } catch (error) {
            process.stdout.write(`Operation failed!${EOL}${error}`);
            closeMessage(cwd);
            throw new Error('FS operation failed');
        }
    };
};


