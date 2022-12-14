import fs from 'fs/promises';
import { EOL } from 'os';
import { doesExist, getAbsolutePath } from '../utils/doesExist.js';
import { currentDirMessage } from '../utils/currentDirMessage.js';


export const remove = async (filePath, cwd) => {
    const absolutePath = getAbsolutePath(filePath, cwd);
    const doesExistPath = await doesExist(absolutePath);
    if (doesExistPath) {
        try {
            await fs.rm((absolutePath), { force: false });
            process.stdout.write(`${EOL}File ${filePath} deleted.${EOL}`);
            currentDirMessage(`${cwd}`);

        } catch (err) {
            throw new Error(`${EOL}FS operation failed`);
        }
    }
    else {
        process.stdout.write(`${EOL}No such file ${filePath} exists.${EOL}`);
        currentDirMessage(`${cwd}`);
    }
};
