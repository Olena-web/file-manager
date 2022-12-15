import { getAbsolutePath } from '../utils/doesExist.js';
import { closeMessage } from '../utils/closeMessage.js';
import { copy } from './copy.js';
import { rm } from 'fs/promises';
import { closeMessage } from '../utils/closeMessage.js';

export const mv = async (fileToMove, newDestination, cwd) => {
    try {
        copy(fileToMove, newDestination);
        const absolutePath = getAbsolutePath(fileToMove);
        await rm(absolutePath);
        console.log(consoleColors.cyan, `${fileToMove} was successfully moved to ${newDestination}`);
        closeMessage(`${cwd}`);
    } catch (err) {
        console.error(consoleColors.red, `Operation failed! ${err}`);
        closeMessage(`${cwd}`);
    }
};