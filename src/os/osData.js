import os, { EOL } from 'os';
import process from 'process';

export const osData = (os_args) => {
    switch (os_args) {
        case "homedir": {
            process.stdout.write(os.homedir());
            break;
        };
        case "architecture": {
            process.stdout.write(os.arch());
            break;
        };
        case "cpus": {
            const cpuCores = os.cpus();
            process.stdout.write(`Total CPU cores: ${cpuCores.length}`);
            cpuCores.map((item) => {
                console.dir(item);
            });
            break;
        };
        case "EOL": {
            process.stdout.write(JSON.stringify(os.EOL));
            break;
        };
        case "username": {
            process.stdout.write(os.userInfo().username);
            break;
        };
        default: {
            process.stdout.write(`${EOL}No such command ${os_args}. Type "help" to see available commands.${EOL}`);
            break;
        };
    }
};