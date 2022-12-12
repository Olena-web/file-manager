#! /usr/bin/env node

import os from 'os';
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
import { compress } from './fs/compressBrotli.js';
import { decompress } from './fs/decompressBrotli.js';
import { calculateHash } from './fs/hash.js';
import { osData } from './os/osData.js';

function fileManager() {

    let cwd = os.homedir();
    process.chdir(cwd);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    process.stdout.write(`Welcome to the File Manager, ${userName()}!\n`);
    process.stdout.write('Type "help" to see all available commands.\n');
    process.stdout.write(`You are currently in: ${cwd}\nEnter your command:\n`);



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
            case "create": {
                if (args.length > 0) {
                    const userPath = args.join(' ');
                    console.log(userPath);
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
                    await rename(fileToRename, newName, cwd);
                    break;
                } else {
                    process.stdout.write(`${os.EOL}Specify a valid path after "rn".${os.EOL}`);
                    closeMessage(`${cwd}`);
                };
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
                process.stdout.write(`Invalid input, type "help" to see available commands.\n`);
                closeMessage(`${cwd}`);
                break;
            };
        };
    }).on('close', () => { console.log(`Thank you for using File Manager, ${userName()}!`) });
};


fileManager();