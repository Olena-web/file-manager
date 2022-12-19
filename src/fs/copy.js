import * as fs from 'fs/promises';
import { createReadStream, createWriteStream } from 'fs';
import { EOL } from 'os';
import { getAbsolutePath } from '../utils/doesExist.js';
import { currentDirMessage } from '../utils/currentDirMessage.js';

export const copy = async (fileToCopy, newDestination, cwd) => {
    const absolutePath = getAbsolutePath(fileToCopy, cwd);
    const newAbsolutePath = getAbsolutePath(newDestination, cwd);
    if (await fs.access
        (newAbsolutePath)
        .then(() => true)
        .catch(() => false)) {
        process.stdout.write(`${EOL}File ${newAbsolutePath} already exists.${EOL}`);
        currentDirMessage(`${cwd}`);
        return;
    }

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