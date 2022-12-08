import { createReadStream, createWriteStream } from 'fs';
import zlib from 'zlib';
import path from 'path';
import { EOL } from 'os';
import { doesExist, getAbsolutePath } from '../utils/doesExist.js';
import { closeMessage } from '../utils/closeMessage.js';

export const decompress = async (filePath, cwd) => {
    const absolutePath = getAbsolutePath(filePath, cwd);
    const doesExistPath = await doesExist(absolutePath);
    if (doesExistPath) {
        try {
            const decompressedFilePath = path.join(absolutePath.replace('.br', ''));
            const readableStream = createReadStream(absolutePath);
            const writebleStream = createWriteStream(decompressedFilePath);
            const brotli = zlib.createBrotliDecompress();
            const stream = readableStream.pipe(brotli).pipe(writebleStream);
            stream.on('finish', () => {
                process.stdout.write(`${EOL} Done decompressing 😎`);
                closeMessage(cwd);
            }
            );
        } catch (error) {
            console.log(`Operation failed!${EOL}${error}`);
            console.log(`You are now in: ${cwd}`);
            closeMessage(cwd);
        }
    };
};