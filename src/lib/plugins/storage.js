export const storage = {
    setItem(...args) {
        window.localStorage.setItem(...args);
    },
    getItem(...args) {
        return window.localStorage.getItem(...args);
    }
};
