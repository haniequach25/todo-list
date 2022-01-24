export const saveToken = (data) => {
    if (data) {
        localStorage.setItem("token", JSON.stringify(data));
    }
};

export const getToken = () => {
    if (localStorage && localStorage.getItem("token")) {
        const token = localStorage.getItem("token");
        return JSON.parse(token);
    }
    else {
        return "";
    }
};

export const removeToken = () => {
    const token = getToken();
    if (token) {
        localStorage.removeItem("token");
    }
};