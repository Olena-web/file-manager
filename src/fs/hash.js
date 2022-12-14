import crypto from 'crypto';
import { createReadStream } from 'fs';
import { EOL } from 'os';
import { doesExist, getAbsolutePath } from '../utils/doesExist.js';
import { currentDirMessage } from '../utils/currentDirMessage.js';

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
                currentDirMessage(cwd);
            });
        } catch (error) {
            process.stdout.write(`Operation failed!${EOL}${error}`);
            currentDirMessage(cwd);
        }
    } else {
        process.stdout.write(`${EOL}No such file ${filePath} exists.${EOL}`);
        currentDirMessage(cwd);
    }
};



