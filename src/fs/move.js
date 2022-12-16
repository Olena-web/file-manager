import { getAbsolutePath } from '../utils/doesExist.js';
import { closeMessage } from '../utils/closeMessage.js';
import { copy } from './copy.js';
import { rm } from 'fs/promises';
import { closeMessage } from '../utils/closeMessage.js';

// export const mv = async (fileToMove, newDestination, cwd) => {
//     try {
//         copy(fileToMove, newDestination);
//         const absolutePath = getAbsolutePath(fileToMove);
//         await rm(absolutePath);
//         console.log(consoleColors.cyan, `${fileToMove} was successfully moved to ${newDestination}`);
//         closeMessage(`${cwd}`);
//     } catch (err) {
//         console.error(consoleColors.red, `Operation failed! ${err}`);
//         closeMessage(`${cwd}`);
//     }
// };
//import fs from "fs-extra";

// Source file
const src = "file.txt";

// Destination path
const dest = "destination/file.txt";
const absolutePath = getAbsolutePath(fileToMove);
// Function call
// Using promises
// Setting overwrite to true

// export const move = async (fileToMove, newDestination, cwd) => {
//     try {
//         fs.move(fileToMove, newDestination, { overwrite: true })
//             .then(() => console.log("File moved to the destination" +
//                 " folder successfully"))
//             .catch((e) => console.log(e));
//         // copy(fileToMove, newDestination);
//         // const absolutePath = getAbsolutePath(fileToMove);
//         // await rm(absolutePath);
//         // console.log(consoleColors.cyan, `${fileToMove} was successfully moved to ${newDestination}`);
//         // closeMessage(`${cwd}`);
//     } catch (err) {
//         console.error(consoleColors.red, `Operation failed! ${err}`);
//         closeMessage(`${cwd}`);
//     }
// };
//copy the $file to $dir2
import * as fs from "fs";
import path from "path";

export const move = (file, dir2) => {
    //include the fs, path modules

    //gets file name and adds it to dir2
    var f = path.basename(file);
    var source = fs.createReadStream(file);
    var dest = fs.createWriteStream(path.resolve(dir2, f));
    console.log(f, source, dest)

    source.pipe(dest);
    source.on('end', function () { console.log('Succesfully copied'); });
    source.on('error', function (err) { console.log(err); });
};

  //example, copy file1.htm from 'test/dir_1/' to 'test/'
  //copyFile('./test/dir_1/file1.htm', './test/');