export const parseStartArgs = () => {
    try {
        const userArgs = process.argv.slice(2).toString();

        if (userArgs.startsWith('--')) {
            const userName = userArgs.split('=')[1];
            return userName;
        } else {
            return ('Please make sure you run the program with "-- --": npm run start -- --username=your_username');
        }
    } catch (err) {
        throw new Error('Error parcing arguments');
    }
}
parseStartArgs();
