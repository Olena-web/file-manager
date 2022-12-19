import path from 'path';

export const concatPaths = ([args]) => {

    let paths = [];

    for (let i = 0; i < args.length - 1; i++) {
        let filePath = args[i].toString();
        const pathObj = path.parse(filePath);
        if (pathObj.ext === '') {
            filePath = (args[i].toString() + " " + args[i + 1].toString()),
                i++;
            if (filePath.includes('.')) {
                paths.push(filePath);
            }
        }
        if (pathObj.ext !== '') {
            filePath = filePath;
            paths.push(filePath);
        }

        return paths;

    }
}