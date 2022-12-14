import { createReadStream, createWriteStream } from 'fs';
import { EOL } from 'os';
import { getAbsolutePath } from '../utils/doesExist.js';
import { currentDirMessage } from '../utils/currentDirMessage.js';

export const copy = async (filePath, cwd) => {

    const indexToInsert = filePath.lastIndexOf('.');
    const copyFilePath = filePath.slice(0, indexToInsert) + '_copy' + filePath.slice(indexToInsert);
    const absolutePath = getAbsolutePath(filePath, cwd);
    const newAbsolutePath = getAbsolutePath(copyFilePath, cwd);

    try {
        const readable = createReadStream(absolutePath);
        const writable = createWriteStream(newAbsolutePath);
        readable.pipe(writable);
        process.stdout.write(`${EOL}File ${filePath} was successfully copied to ${copyFilePath}.`);
    } catch (err) {
        process.stdout.write(`Operation failed! ${err}`);
    }
    currentDirMessage(`${cwd}`);
}