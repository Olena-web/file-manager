import crypto from 'crypto';
import { createReadStream } from 'fs';
import { EOL } from 'os';
import { doesExist, getAbsolutePath } from '../utils/doesExist.js';
import { closeMessage } from '../utils/closeMessage.js';

export const calculateHash = async (filePath, cwd) => {
    const absolutePath = getAbsolutePath(filePath, cwd);
    const doesExistPath = await doesExist(absolutePath);
    if (doesExistPath) {
        try {
            const readableStream = createReadStream(absolutePath, 'utf8');
            let hashValue = '';
            readableStream.on('data', (chunk) => {
                const hash = crypto.createHash('sha256');
                hash.update(chunk);
                hashValue = hash.digest('hex');
            })
            readableStream.on('end', () => {
                process.stdout.write(`${EOL}Hash for the file: ${filePath} is: ${hashValue}${EOL}`);
                closeMessage(cwd);
            });
        } catch (error) {
            process.stdout.write(`Operation failed!${EOL}${error}`);
            closeMessage(cwd);
        }
    } else {
        process.stdout.write(`${EOL}No such file ${filePath} exists.${EOL}`);
        closeMessage(cwd);
    }
};



