import fs from 'fs/promises';
import { EOL } from 'os';
import { doesExist, getAbsolutePath } from '../utils/doesExist.js';
import { closeMessage } from '../utils/closeMessage.js';


export const rename = async (fileToRename, newName) => {
    try {
        const absolutePath = getAbsolutePath(fileToRename);
        const doesExistPath = await doesExist(absolutePath);
        const pathFileNew = path.join(cwd, newName);
        fs.access(pathFileNew, fs.F_OK, (err) => {
            if (err) {
                fs.access(absolutePath, fs.F_OK, (err) => {
                    if (err) {
                        return console.log('FS operation failed');
                    }
                    return fs.rename(absolutePath, pathFileNew, () => { });
                })
                return;
            }
            return console.log('FS operation failed');
        })
    } catch (err) {
        console.log(err);
    }
}