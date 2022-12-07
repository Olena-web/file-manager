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
import { read } from './fs/readFile.js';

function fileManager() {

    let cwd = os.homedir();
    process.chdir(cwd);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });


    rl.question(`What's your name? \n`, userName => {
        process.stdout.write(`Welcome to the File Manager, ${userName}!\n`);
        process.stdout.write('Type "help" to see all available commands.\n');
        process.stdout.write(`You are currently in: ${cwd}\nEnter your command:\n`);



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
                    if (commandArray.length > 0) {
                        cwd = path.join(cwd, commandArray.slice(1).join(' '));
                        const doesExistPath = await doesExist(cwd);

                        if (doesExistPath) {
                            process.chdir(cwd);
                            printCurrentDirectory(cwd);
                        } else {
                            process.stdout.write(`${os.EOL}No such directory ${cwd} exists.${os.EOL}`);
                            printCurrentDirectory(cwd);
                        }
                    } else {
                        process.stdout.write(`${os.EOL}Specify a valid directory after "cd".${os.EOL}`);
                        printCurrentDirectory(cwd);
                    }
                    break;
                }
                case "up": {
                    if (cwd === os.homedir()) {
                        process.stdout.write(`${os.EOL}You are already in your root directory: ${os.homedir()}${os.EOL}Enter command or type "help":${os.EOL}`);
                    } else {
                        cwd = path.join(cwd, '..');
                        process.chdir(cwd);
                    }
                    break;
                }
                case "ls": {
                    await listDirectory(cwd);
                    printCurrentDirectory(cwd);
                    break;
                }
                case "cat": {
                    if (commandArray.length > 0) {
                        const userPath = commandArray.join(' ');
                        await read(userPath);
                    } else {
                        process.stdout.write(`${os.EOL}Specify a valid path after "cat".${os.EOL}`);

                    };
                    break;
                }
                default: {
                    process.stdout.write(`Invalid input, type "help" to see available commands.\n`);
                    console.log(`cwd: ${cwd}`);
                    break;
                };
            };
        }).on('close', () => { console.log(`Thank you for using File Manager, ${userName}!`) });
    });

};

fileManager();