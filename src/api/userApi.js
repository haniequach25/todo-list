import axiosClient from "./axiosClient"

export const loginApi = async (data) => {
    try {
        const url = "/auth/login";
        const response = await axiosClient.post(url, data);
        return response;
    } catch (error) {
        return error.response.data;
    }
};

export const registerApi = async (data) => {
    try {
        const url = "/auth/register";
        const response = await axiosClient.post(url, data);
        return response;
    } catch (error) {
        return error.response.data;
    }
};