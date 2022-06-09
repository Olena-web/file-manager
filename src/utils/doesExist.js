
export const doesExist = async (path) => {
    try {
        await fs.stat(path);
        return true;
    } catch (err) {
        return false;
    }
};
