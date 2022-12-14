import { EOL } from 'os';
import { consoleColors } from './consoleColors.js';


export const currentDirMessage = (cwd) => {
    console.log(`${EOL}You are currently in: `, consoleColors.magenta, `${cwd}`, consoleColors.reset, `${EOL}${EOL}Enter your command:${EOL}`);
}