import fs from 'fs/promises';

export const listDirectory = async (dirPath) => {
    try {
        const files = await fs.readdir(dirPath);
        console.log(files);
    } catch (err) {
        throw new Error('FS operation failed');
    }
};

