import { createReadStream } from 'fs';
import { EOL } from 'os';
import { doesExist, getAbsolutePath } from '../utils/doesExist.js';


export const read = async (filePath, cwd) => {
    const absolutePath = getAbsolutePath(filePath, cwd);
    const doesExistPath = await doesExist(absolutePath);
    if (doesExistPath) {
        try {
            const readableStream = createReadStream(absolutePath, 'utf8');

            readableStream.on('data', (chunk) => {
                process.stdout.write(chunk);
            })
            readableStream.on('end', () => {
                console.log(`You are now in: ${cwd}`);
            });
        } catch (error) {
            console.log(`Operation failed!${EOL}${error}`);
            console.log(`You are now in: ${cwd}`);
        }
    } else {
        process.stdout.write(`${EOL}No such file ${filePath} exists.${EOL}`);
        console.log(`You are now in: ${cwd}`);
    }
};