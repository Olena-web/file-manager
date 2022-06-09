export const parseStartArgs = () => {
    const args = process.argv.slice(2);
    if (args.length > 0) {
        console.log(`User name: ${args[0]}`);
        return args[0];
    }
    return 'Stranger';
}
parseStartArgs();