import fs from 'fs/promises';


export const listDirectory = async (dirPath) => {
    let fileList = [];
    try {
        const files = await fs.readdir(dirPath, { withFileTypes: true });
        files.forEach((file) => {
            const item = {
                Name: file.name,
                Type: file.isDirectory() ? 'directory' : 'file',
            };
            fileList.push(item);
        });

    } catch (err) {
        throw new Error('FS operation failed');
    }
    console.table(fileList);
};

