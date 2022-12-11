import os from 'os';
import process from 'process';

export const processExit = () => {
    process.stdout.write(`${os.EOL}Thank you for using File Manager, ${userName()}!`);
    process.exit();
}