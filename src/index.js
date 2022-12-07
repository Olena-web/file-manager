#! /usr/bin/env node

import os from 'os';
import process from 'process';
import { userName } from './cli/parseStartArgs.js';
import { help } from './utils/help.js';
import readline from 'readline';
import path from 'path';
import { doesExist } from './utils/doesExist.js';
import { listDirectory } from './fs/listDirectory.js';
import { printCurrentDirectory } from './utils/cwd.js';
import { read } from './fs/readFile.js';
import { compress } from './fs/compressBrotli.js';
import { calculateHash } from './fs/hash.js';

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
        const commandArray = lineToString.split(" ");
        switch (commandArray[0]) {
            case ".exit": {
                process.stdout.write(`Thank you for using File Manager, ${userName()}!`);
                process.exit();
            };
            case "exit": {
                process.stdout.write(`Thank you for using File Manager, ${userName()}!`);
                process.exit();
            };
            case "help": {
                help();
                break;
            };
            case "cd": {
                if (commandArray.length > 0) {
                    cwd = path.join(cwd, commandArray.slice(1).join(' '));
                    const doesExistPath = await doesExist(cwd);

                    if (doesExistPath) {
                        try {
                            process.chdir('../');
                        }
                        catch (err) {
                            console.log(err);
                        }
                        process.stdout.write(`You are now in: ${cwd}\n`);
                    } else {
                        process.stdout.write(`No such directory ${cwd} exists.\nEnter your command or type "help":\n`);
                    }
                }
                break;
            }
            case "up": {
                if (cwd === os.homedir()) {
                    process.stdout.write(`${os.EOL}You are already in your root directory: ${os.homedir()}${os.EOL}Enter command or type "help":${os.EOL}`);
                } else {
                    cwd = path.join(cwd, '..');
                    process.chdir(cwd);
                    process.stdout.write(`You are now in: ${cwd}\n`);
                }
                break;
            }
            case "ls": {
                console.log(`cwd: ${cwd}`);
                await listDirectory(cwd);
                process.stdout.write(`You are now in: ${cwd}\n`);

                break;
            }
            case "cat": {
                if (args.length > 0) {
                    const userPath = args.join(' ');
                    await read(userPath, cwd);
                } else {
                    process.stdout.write(`${os.EOL}Specify a valid path after "cat".${os.EOL}`);
                    //commandClosingMsg(cwd);
                };
                break;
            }
            case "hash": {
                try {
                    if (commandArray.length > 0) {
                        cwd = path.join(cwd, commandArray.slice(1).join(' '));
                        const doesExistPath = await doesExist(cwd);
                        if (doesExistPath) {
                            try {
                                await calculateHash(cwd);
                            }

                            catch (err) {
                                console.log(err);
                            }
                        } else {
                            process.stdout.write(`No such directory ${cwd} exists.\nEnter your command or type "help":\n`);
                        }
                    }

                } catch (err) {
                    console.log(err);
                    process.stdout.write(`${os.EOL}Specify a valid path after "hash".${os.EOL}`);
                }
                //commandClosingMsg(cwd);
                break;
            }
            case "compress": {
                if (args.length > 0) {
                    const userPath = args.join(' ');
                    await compress(userPath, cwd);
                } else {
                    process.stdout.write(`${os.EOL}Specify a valid path after "compress".${os.EOL}`);
                    //commandClosingMsg(cwd);
                };
                break;
            }
            default: {
                process.stdout.write(`Invalid input, type "help" to see available commands.\n`);
                console.log(`cwd: ${cwd}`);
                break;
            };
        };
    }).on('close', () => { console.log(`Thank you for using File Manager, ${userName()}!`) });
};


fileManager();