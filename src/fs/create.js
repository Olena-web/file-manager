import * as fs from 'fs/promises';
import { EOL } from 'os';
import process from 'process';
import { getAbsolutePath } from '../utils/doesExist.js';
import { currentDirMessage } from '../utils/currentDirMessage.js';

export const create = async (filePath, cwd) => {
    const absolutePath = getAbsolutePath(filePath, cwd);
    try {
        await fs.writeFile(absolutePath, '');
        process.stdout.write(`${EOL}File ${filePath} was successfully created.`);
    } catch (err) {
        process.stdout.write(`${EOL}Operation failed! ${err}${EOL}`);
    }
    currentDirMessage(`${cwd}`);
}