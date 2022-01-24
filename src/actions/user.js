export const loginUserAction = (data) => {
    return {
        type: "LOGIN",
        payload: data
    }
}

export const logoutUserAction = (data) => {
    return {
        type: "LOGOUT",
        payload: ""
    }
}