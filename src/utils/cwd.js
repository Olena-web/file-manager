

export const printCurrentDirectory = (dirPath) => {
    process.stdout.write(`You are now in: ${process.cwd(dirPath)}\n`);
}

