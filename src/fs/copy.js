import { createReadStream, createWriteStream } from 'fs';
import { EOL } from 'os';
import { getAbsolutePath } from '../utils/doesExist.js';
import { currentDirMessage } from '../utils/currentDirMessage.js';

export const copy = async (fileToCopy, newDestination, cwd) => {
    const absolutePath = getAbsolutePath(fileToCopy, cwd);
    const newAbsolutePath = getAbsolutePath(newDestination, cwd);
    console.log(absolutePath, newAbsolutePath);

    try {
        const readable = createReadStream(absolutePath);
        const writable = createWriteStream(newAbsolutePath);
        readable.pipe(writable);
        process.stdout.write(`${EOL}File ${fileToCopy} was successfully copied to ${newDestination}.`);
    } catch (err) {
        process.stdout.write(`Operation failed! ${err}`);
    }
    currentDirMessage(`${cwd}`);
}