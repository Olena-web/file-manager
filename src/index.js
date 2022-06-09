#! /usr/bin/env node

import os from 'os';
import process from 'process';
import { parseStartArgs } from './cli/parseStartArgs.js';
import { help } from './utils/help.js';
import readline from 'readline';
import path from 'path';
import { doesExist } from './utils/doesExist.js';
import { listDirectory } from './fs/listDirectory.js';
import { printCurrentDirectory } from './utils/cwd.js';
import { read } from './fs/read.js';

function fileManager() {

    const userName = parseStartArgs();

    let cwd = os.homedir();
    process.chdir(cwd);

    process.stdout.write(`Welcome to the File Manager, ${userName}!\n`);
    process.stdout.write('Type "help" to see all available commands.\n');
    process.stdout.write(`You are currently in: ${cwd}\nEnter your command:\n`);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on('line', async (line) => {
        const lineToString = line.toString().trim();
        const commandArray = lineToString.split(" ");
        switch (commandArray[0]) {
            case ".exit": {
                process.stdout.write(`Thank you for using File Manager, ${userName}!`);
                process.exit();
            };
            case "exit": {
                process.stdout.write(`Thank you for using File Manager, ${userName}!`);
                process.exit();
            };
            case "help": {
                help();
                break;
            };
            case "cd": {
                if (commandArray.length > 1) {
                    cwd = path.join(cwd, commandArray.slice(1).join(' '));
                    const doesExistPath = await doesExist(cwd);
                    if (doesExistPath) {
                        printCurrentDirectory(cwd);
                        process.chdir(cwd);
                        process.stdout.write(`You are now in: ${cwd}\n`);
                    } else {
                        process.stdout.write(`No such directory ${cwd} exists.\nEnter your command or type "help":\n`);
                    }
                }
                break;
            }
            case "up": {
                console.log(`os.homedir(): ${os.homedir()}`);
                if (cwd === os.homedir()) {
                    process.stdout.write(`You are already in the root directory: ${os.homedir()}\n`);
                } else {
                    cwd = path.join(cwd, '../');
                    if (cwd === os.homedir()) {
                        process.stdout.write(`You are already in the root directory: ${os.homedir()}\n`);
                    } else {
                        printCurrentDirectory(cwd);
                        // process.chdir(cwd);
                        // process.stdout.write(`You are now in: ${cwd}\n`);
                    }
                }
                break;
            }
            case "ls": {
                console.log(`cwd: ${cwd}`);
                await listDirectory(cwd).then((data) => {
                    printCurrentDirectory(cwd);
                });
                // printCurrentDirectory(cwd);
                break;
            }
            case "cat": {
                console.log(`cwd: ${cwd}`);
                await read(cwd).then((data) => {
                    process.stdout.write(data);
                });
                break;
            }
            default: {
                process.stdout.write(`Invalid input, type "help" to see available commands.\n`);
                break;
            };
        };
    }).on('close', () => { console.log(`Thank you for using File Manager, ${userName}!`) });

};

fileManager();