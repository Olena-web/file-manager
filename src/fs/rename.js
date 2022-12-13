import * as fs from 'fs/promises';
import { EOL } from 'os';
import { closeMessage } from '../utils/closeMessage.js';
import path from 'path';


export const rename = async (fileToRename, newName, cwd) => {
    const absoluteOldPath = path.join(`${cwd}`, fileToRename);
    const absoluteNewPath = path.join(`${cwd}`, newName);
    if (fileToRename === newName) {
        process.stdout.write(`${EOL}File ${fileToRename} already exists.${EOL}`);
        closeMessage(`${cwd}`);
        return;
    }
    if (await fs.access
        (absoluteNewPath)
        .then(() => true)
        .catch(() => false)) {
        process.stdout.write(`${EOL}File ${newName} already exists.${EOL}`);
        closeMessage(`${cwd}`);
        return;
    }
    if (!await fs.access
        (absoluteOldPath)
        .then(() => true)
        .catch(() => false)) {
        process.stdout.write(`${EOL}File ${fileToRename} does not exist.${EOL}`);
        closeMessage(`${cwd}`);
        return;
    }

    try {
        await fs.rename(absoluteOldPath, absoluteNewPath);
        process.stdout.write(`${EOL}File ${fileToRename} renamed successfully in ${newName}.${EOL}`);
        closeMessage(`${cwd}`);
    } catch (err) {
        process.stdout.write(`${EOL}Operation failed! ${err}${EOL}`);
        closeMessage(`${cwd}`);
    }
}
