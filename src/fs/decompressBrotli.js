import { createReadStream, createWriteStream } from 'fs';
import * as fs from 'fs/promises';
import zlib from 'zlib';
import path from 'path';
import { EOL } from 'os';
import { doesExist, getAbsolutePath } from '../utils/doesExist.js';
import { currentDirMessage } from '../utils/currentDirMessage.js';

export const decompress = async (filePath, destinationPath, cwd) => {
    const absolutePath = getAbsolutePath(filePath, cwd);
    const newAbsolutePath = getAbsolutePath(destinationPath, cwd);
    if (await fs.access
        (newAbsolutePath)
        .then(() => true)
        .catch(() => false)) {
        process.stdout.write(`${EOL}File ${newAbsolutePath} already exists.${EOL}`);
        currentDirMessage(`${cwd}`);
        return;
    }
    try {
        const readableStream = createReadStream(absolutePath);
        const writebleStream = createWriteStream(newAbsolutePath);
        const brotli = zlib.createBrotliDecompress();
        const stream = readableStream.pipe(brotli).pipe(writebleStream);
        stream.on('finish', () => {
            process.stdout.write(`${EOL} Done decompressing 😎`);
            currentDirMessage(cwd);
        }
        );
    } catch (error) {
        console.log(`Operation failed!${EOL}${error}`);
        console.log(`You are now in: ${cwd}`);
        currentDirMessage(cwd);
    }
};
