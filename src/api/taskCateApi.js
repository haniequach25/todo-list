import axiosClient from "./axiosClient"

export const getCategoryApi = async (param, token) => {
    try {
        const url = "/api/categories";
        const response = await axiosClient.get(url, {
            param,
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response.data;
    }
};