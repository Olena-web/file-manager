
export const help = () => {
    const helpText = `
    Available commands:
    .up - changes the current working directory to the parent directory
    .cd - changes the current working directory
    .ls - lists the contents of the current working directory
    .cat- reads the contents of a file
    .add - adds a file to the current working directory
    .rm - removes a file from the current working directory
    .rn - renames a file in the current working directory
    .cp - copies a file to the current working directory
    .mv - moves a file to the current working directory
    .os --EOL - get EOL
    .os --cpus - get number of cpus
    .os --homedir - get home directory
    .os --username - get username
    .os --architecture - get architecture
    .hash - get hash of a file
    .compress - compress a file
    .decompress - decompress a file
    .exit - exits the program
    .help - prints this help text

    `;
    process.stdout.write(helpText);
};

