import fs from 'fs/promises';
import path from 'path';
//import { __dirname } from './create.js';


export const remove = async (dirPath) => {

    try {
        await fs.rm((dirPath), { force: false });

    } catch (err) {
        throw new Error('FS operation failed');
    }

};
remove();