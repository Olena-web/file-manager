#! /usr/bin/env node

import os, { EOL } from 'os';
import * as fs from 'fs/promises';
import process from 'process';
import path from 'path';
import readline from 'readline';

import { userName } from './cli/parseStartArgs.js';
import { help } from './utils/help.js';
import { closeMessage } from './utils/closeMessage.js';
import { processExit } from './utils/processExit.js';
import { doesExist } from './utils/doesExist.js';
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
import { getAbsolutePath } from './utils/doesExist.js';


function fileManager() {

    let cwd = os.homedir();
    process.chdir(cwd);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    process.stdout.write(`${EOL}Welcome to the File Manager, ${userName()}!${EOL}`);
    process.stdout.write(`${EOL}Type "help" to see all available commands.${EOL}`);
    process.stdout.write(`${EOL}You are currently in: ${cwd}${EOL}${EOL}Enter your command:${EOL}`);



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
                        closeMessage(cwd);

                    } else {
                        process.stdout.write(`${os.EOL}No such directory ${cwd} exists.${os.EOL}`);
                        cwd = path.join(cwd, '..');
                        closeMessage(cwd);
                    }
                } else {
                    process.stdout.write(`${os.EOL}Specify a valid directory after "cd".${os.EOL}`);
                    cwd = path.join(cwd, '..');
                    closeMessage(cwd);

                }
                break;
            };
            case "up": {
                if (cwd === os.homedir()) {
                    process.stdout.write(`${os.EOL}You are already in your root directory: ${os.homedir()}${os.EOL}Enter command or type "help":${os.EOL}`);
                } else {
                    cwd = path.join(cwd, '..');
                    process.chdir(cwd);
                    closeMessage(`${cwd}`);
                }
                break;
            }
            case "ls": {
                console.log(`cwd: ${cwd}`);
                await listDirectory(cwd);
                closeMessage(`${cwd}`);

                break;
            }
            case "cat": {
                if (args.length > 0) {
                    const userPath = args.join(' ');
                    await read(userPath, cwd);
                } else {
                    process.stdout.write(`${os.EOL}Specify a valid path after "cat".${os.EOL}`);
                    closeMessage(`${cwd}`);
                };
                break;
            }
            case "rm": {
                if (args.length > 0) {
                    const userPath = args.join(' ');
                    await remove(userPath, cwd);
                } else {
                    process.stdout.write(`${os.EOL}Specify a valid path after "delete".${os.EOL}`);
                    closeMessage(`${cwd}`);
                };
                break;
            }
            case "add": {
                if (args.length > 0) {
                    const userPath = args.join(' ');
                    await create(userPath, cwd);
                } else {
                    process.stdout.write(`${os.EOL}Specify a valid path after "create".${os.EOL}`);
                    closeMessage(`${cwd}`);
                };
                break;
            }
            case 'rn': {
                if (args.length === 2) {
                    const fileToRename = args[0].toString();
                    const newName = args[1].toString();
                    await rename(fileToRename, newName, `${cwd}`);

                } else {
                    process.stdout.write(`${os.EOL}Specify a valid path after "rn".${os.EOL}`);
                    closeMessage(`${cwd}`);
                };
                break;
            }
            case 'cp': {
                console.log(args.length, args);
                if (args.length === 2) {
                    const fileToCopy = args[0].toString();
                    const newDestination = args[1].toString();
                    console.log(fileToCopy, newDestination);
                    await copy(fileToCopy, newDestination, `${cwd}`);
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
                    closeMessage(`${cwd}`);
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
                    closeMessage(`${cwd}`);
                };
                break;
            }
            case "hash": {
                if (args.length > 0) {
                    const userPath = args.join(' ');
                    await calculateHash(userPath, cwd);
                } else {
                    process.stdout.write(`${os.EOL}Specify a valid path after "hash".${os.EOL}`);
                    closeMessage(`${cwd}`);
                };
                break;
            }
            case "compress": {
                if (args.length > 0) {
                    const userPath = args.join(' ');
                    await compress(userPath, cwd);
                } else {
                    process.stdout.write(`${os.EOL}Specify a valid path after "compress".${os.EOL}`);
                    closeMessage(`${cwd}`);
                };
                break;
            }
            case "decompress": {
                if (args.length > 0) {
                    const userPath = args.join(' ');
                    await decompress(userPath, cwd, destinationPath);
                } else {
                    process.stdout.write(`${os.EOL}Specify a valid path after "decompress".${os.EOL}`);
                    closeMessage(`${cwd}`);
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
                closeMessage(`${cwd}`);
                break;
            };

            default: {
                process.stdout.write(`${EOL}Invalid input, type "help" to see available commands.${EOL}`);
                closeMessage(`${cwd}`);
                break;
            };
        };
    }).on('close', () => { process.stdout.write(`${EOL}Thank you for using File Manager, ${userName()}, goodbye!${EOL}`) });
};


fileManager();