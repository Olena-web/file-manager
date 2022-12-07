export const userName = () => {
    try {
        if (process.argv[2].startsWith('--')) {
            const user = process.argv.slice(3);
            const userName = user.toString().split('').slice(2).join('');
            return userName;
        } else {
            return ('Please make sure you run the program with "-- --": npm run start -- --username=your_username');
        }
    } catch (err) {
        throw new Error('Error parcing arguments');
    }
}

