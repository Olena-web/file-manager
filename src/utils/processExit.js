import process from 'process';
import { EOL } from 'os';
import { userName } from '../cli/parseStartArgs.js';
import { consoleColors } from './consoleColors.js';

export const processExit = () => {
    console.log(consoleColors.cyan, `${EOL}Thank you for using File Manager, ${userName()}, goodbye!${EOL}`, consoleColors.reset),
        process.exit(0)
}