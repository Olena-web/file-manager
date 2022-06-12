import fs from 'fs';
import path from 'path';

export const doesExist = async (pathDirectory) => {
    try {
        await fs.promises.access(pathDirectory);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
}
export const doesPathAbsolute = (pathDirectory) => {
    path.isAbsolute(pathDirectory);
    // console.log(`path.isAbsolute(pathDirectory): ${path.isAbsolute(pathDirectory)}`);
    // return path.isAbsolute(pathDirectory);

}
doesPathAbsolute('/file-manager/src/utils/doesExist.js');
