import path from 'path';

export const doesExist = async (path) => {
    try {
        await fs.stat(path);
        return true;
    } catch (err) {
        return false;
    }
};

export const doesPathAbsolute = (pathDirectory) => {
    path.isAbsolute(pathDirectory);
    // console.log(`path.isAbsolute(pathDirectory): ${path.isAbsolute(pathDirectory)}`);
    // return path.isAbsolute(pathDirectory);

}
doesPathAbsolute('/file-manager/src/utils/doesExist.js');
