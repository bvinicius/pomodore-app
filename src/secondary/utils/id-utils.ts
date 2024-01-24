export const createId = () => {
    return Number(Date.now().toString().slice(-6));
};
