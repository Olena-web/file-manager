#! /usr/bin/env node

import os, { EOL } from 'os';
import * as fs from 'fs/promises';
import process from 'process';
import path from 'path';
import readline from 'readline';

import { userName } from './cli/parseStartArgs.js';
import { help } from './utils/help.js';
import { currentDirMessage } from './utils/currentDirMessage.js';
import { processExit } from './utils/processExit.js';
import { doesExist, doesPathAbsolute } from './utils/doesExist.js';
import { listDirectory } from './fs/listDirectory.js';
import { read } from './fs/readFile.js';
import { remove } from './fs/delete.js';
import { create } from './fs/create.js';
import { rename } from './fs/rename.js';
import { copy } from './fs/copy.js';
import { compress } from './fs/compressBrotli.js';
import { decompress } from './fs/decompressBrotli.js';
import { calculateHash } from './fs/hash.js';
import { osData } from './os/osData.js';
import { consoleColors } from './utils/consoleColors.js';
import { concatPaths } from './utils/concatPaths.js';


function fileManager() {

    let cwd = os.homedir();
    process.chdir(cwd);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    console.log(consoleColors.cyan, `${EOL}Welcome to the File Manager, ${userName()}!${EOL}`, consoleColors.reset);
    console.log(`${EOL}Type` + consoleColors.green, "help", consoleColors.reset, `to see all available commands.${EOL}`);
    currentDirMessage(cwd);


    rl.on('line', async (line) => {
        const lineToString = line.toString().trim();
        const [command, ...args] = lineToString.split(" ");
        switch (command) {
            case ".exit": {
                processExit();
            };
            case "exit": {
                processExit();
            };
            case "help": {
                help();
                break;
            };
            case "cd": {
                if (args.length > 0) {
                    cwd = path.join(cwd, args.join(' '));
                    const doesExistPath = await doesExist(cwd);
                    if (doesExistPath) {
                        process.chdir(cwd);
                        currentDirMessage(cwd);

                    } else {
                        process.stdout.write(`${os.EOL}No such directory ${cwd} exists.${os.EOL}`);
                        cwd = path.join(cwd, '..');
                        currentDirMessage(cwd);
                    }
                } else {
                    process.stdout.write(`${os.EOL}Specify a valid directory after "cd".${os.EOL}`);
                    cwd = path.join(cwd, '..');
                    currentDirMessage(cwd);

                }
                break;
            };
            case "up": {
                if (cwd === os.homedir()) {
                    process.stdout.write(`${os.EOL}You are already in your root directory: ${os.homedir()}${os.EOL}Enter command or type "help":${os.EOL}`);
                } else {
                    cwd = path.join(cwd, '..');
                    process.chdir(cwd);
                    currentDirMessage(`${cwd}`);
                }
                break;
            }
            case "ls": {
                console.log(`cwd: ${cwd}`);
                await listDirectory(cwd);
                currentDirMessage(`${cwd}`);

                break;
            }
            case "cat": {
                if (args.length > 0) {
                    const userPath = args.join(' ');
                    await read(userPath, cwd);
                } else {
                    process.stdout.write(`${os.EOL}Specify a valid path after "cat".${os.EOL}`);
                    currentDirMessage(`${cwd}`);
                };
                break;
            }
            case "rm": {
                if (args.length > 0) {
                    const userPath = args.join(' ');
                    await remove(userPath, cwd);
                } else {
                    process.stdout.write(`${os.EOL}Specify a valid path after "delete".${os.EOL}`);
                    currentDirMessage(`${cwd}`);
                };
                break;
            }
            case "add": {
                if (args.length > 0) {
                    const userPath = args.join(' ');
                    await create(userPath, cwd);
                } else {
                    process.stdout.write(`${os.EOL}Specify a valid path after "create".${os.EOL}`);
                    currentDirMessage(`${cwd}`);
                };
                break;
            }
            case 'rn': {
                if (args.length >= 2) {
                    let names = [];

                    for (let i = 0; i < args.length - 1; i++) {
                        let fileToRename = args[i].toString();
                        const pathObj = path.parse(fileToRename);
                        if (pathObj.ext === '') {
                            fileToRename = (args[i].toString() + " " + args[i + 1].toString()),
                                i++;
                            if (fileToRename.includes('.')) {
                                names.push(fileToRename);
                            }
                        }
                        if (pathObj.ext !== '') {
                            fileToRename = fileToRename;
                            names.push(fileToRename);
                        }
                    }
                    if (names.length === 1) {
                        const fileToRename = names[0].toString();
                        const newName = fileToRename
                        await copy(fileToRename, newName, `${cwd}`);
                    }
                    if (names.length === 2) {
                        const fileToRename = names[0].toString();
                        const newName = names[1].toString();
                        await rename(fileToRename, newName, `${cwd}`);
                    }

                    break;
                }
                if (args.length === 2) {
                    const fileToRename = args[0].toString();
                    const newName = args[1].toString();
                    await rename(fileToRename, newName, `${cwd}`);

                } else {
                    process.stdout.write(`${os.EOL}Specify a valid path after "rn".${os.EOL}`);
                    currentDirMessage(`${cwd}`);
                };
                break;
            }
            case 'cp': {

                if (args.length >= 2) {
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
                    }
                    if (paths.length === 1) {
                        const fileToCopy = paths[0].toString();
                        const indexToInsert = fileToCopy.lastIndexOf('.');
                        const newDestination = fileToCopy.slice(0, indexToInsert) + '_copy' + fileToCopy.slice(indexToInsert);
                        await copy(fileToCopy, newDestination, `${cwd}`);
                    }
                    if (paths.length === 2) {
                        const fileToCopy = paths[0].toString();
                        const newDestination = paths[1].toString();
                        await copy(fileToCopy, newDestination, `${cwd}`);
                    }

                    break;
                }
                if (args.length === 1) {
                    const fileToCopy = args[0].toString();
                    const indexToInsert = fileToCopy.lastIndexOf('.');
                    const newDestination = fileToCopy.slice(0, indexToInsert) + '_copy' + fileToCopy.slice(indexToInsert);

                    await copy(fileToCopy, newDestination, `${cwd}`);
                    break;
                }

                else {
                    process.stdout.write(`${os.EOL}Specify a valid path after "cp".${os.EOL}`);
                    currentDirMessage(`${cwd}`);
                };
                break;
            }
            case "mv": {
                if (args.length === 2) {
                    const fileToMove = args[0].toString();
                    const newDestination = args[1].toString();
                    await move(fileToMove, newDestination);
                } else {
                    process.stdout.write(`${os.EOL}Specify a valid path after "mv".${os.EOL}`);
                    currentDirMessage(`${cwd}`);
                };
                break;
            }
            case "hash": {
                if (args.length > 0) {
                    const userPath = args.join(' ');
                    await calculateHash(userPath, cwd);
                } else {
                    process.stdout.write(`${os.EOL}Specify a valid path after "hash".${os.EOL}`);
                    currentDirMessage(`${cwd}`);
                };
                break;
            }
            case "compress": {
                let paths = [];
                if (args.length >= 2) {
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

                        if (paths.length === 1) {
                            const filePath = paths[0].toString();
                            const newDestination = filePath;
                            await compress(filePath, newDestination, `${cwd}`);
                        }
                        if (paths.length === 2) {
                            const filePath = paths[0].toString();
                            const newDestination = paths[1].toString();
                            await compress(filePath, newDestination, `${cwd}`)
                        }
                        break;
                    }
                } else {
                    process.stdout.write(`${os.EOL}Specify a valid path after "compress".${os.EOL}`);
                    currentDirMessage(`${cwd}`);
                };
                break;
            }
            case "decompress": {
                if (args.length === 2) {

                    const filePath = args[0].toString();
                    const destinationPath = args[1].toString();
                    console.log(filePath, destinationPath);
                    await decompress(filePath, destinationPath, `${cwd}`);

                } else {
                    process.stdout.write(`${os.EOL}Specify a valid path after "decompress".${os.EOL}`);
                    currentDirMessage(`${cwd}`);
                };
                break;
            }
            case "os": {
                if (args.length > 0 && args[0].startsWith('--')) {
                    const arg = args[0].slice(2);
                    osData(arg);
                } else {
                    process.stdout.write(`${os.EOL}Specify a valid path after "os".${os.EOL}`);
                }
                currentDirMessage(`${cwd}`);
                break;
            };

            default: {
                process.stdout.write(`${EOL}Invalid input, type "help" to see available commands.${EOL}`);
                currentDirMessage(`${cwd}`);
                break;
            };
        };
    }).on('close', () => {
        processExit()
    });
};


fileManager();