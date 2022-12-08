import { EOL } from 'os';

export const closeMessage = (cwd) => {
    process.stdout.write(`${EOL}You are currently in: ${cwd}${EOL}Enter command or type "help":${EOL}`);
}