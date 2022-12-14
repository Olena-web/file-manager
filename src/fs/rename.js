import * as fs from 'fs/promises';
import { EOL } from 'os';
import { currentDirMessage } from '../utils/currentDirMessage.js';
import path from 'path';


export const rename = async (fileToRename, newName, cwd) => {
    const absoluteOldPath = path.join(`${cwd}`, fileToRename);
    const absoluteNewPath = path.join(`${cwd}`, newName);
    if (fileToRename === newName) {
        process.stdout.write(`${EOL}File ${fileToRename} already exists.${EOL}`);
        currentDirMessage(`${cwd}`);
        return;
    }
    if (await fs.access
        (absoluteNewPath)
        .then(() => true)
        .catch(() => false)) {
        process.stdout.write(`${EOL}File ${newName} already exists.${EOL}`);
        currentDirMessage(`${cwd}`);
        return;
    }
    if (!await fs.access
        (absoluteOldPath)
        .then(() => true)
        .catch(() => false)) {
        process.stdout.write(`${EOL}File ${fileToRename} does not exist.${EOL}`);
        currentDirMessage(`${cwd}`);
        return;
    }

    try {
        await fs.rename(absoluteOldPath, absoluteNewPath);
        process.stdout.write(`${EOL}File ${fileToRename} renamed successfully in ${newName}.${EOL}`);
        currentDirMessage(`${cwd}`);
    } catch (err) {
        process.stdout.write(`${EOL}Operation failed! ${err}${EOL}`);
        currentDirMessage(`${cwd}`);
    }
}
