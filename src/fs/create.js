import * as fs from 'fs/promises';
import { EOL } from 'os';
import { getAbsolutePath } from '../utils/doesExist.js';
import { closeMessage } from '../utils/closeMessage.js';

export const create = async (filePath, cwd) => {
    const absolutePath = getAbsolutePath(filePath, cwd);
    try {
        await fs.writeFile(absolutePath, '');
        console.log(`${EOL}File ${filePath} was successfully created.`);
    } catch (err) {
        console.log(`Operation failed! ${err}`);
    }
    closeMessage(`${cwd}`);
}