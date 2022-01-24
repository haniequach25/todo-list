import axiosClient from "./axiosClient"

export const getTaskApi = async (param, token) => {
    try {
        const url = "/api/tasks";
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

export const createTaskApi = async (data, token) => {
    try {
        const url = "/api/tasks";
        const response = await axiosClient.post(url, data, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response.data;
    }
};

export const updateTaskApi = async (id, data, token) => {
    try {
        const url = `/api/tasks/${id}`;
        const response = await axiosClient.patch(url, data, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response.data;
    }
};

export const deleteTaskApi = async (id, token) => {
    try {
        const url = `/api/tasks/${id}`;
        const response = await axiosClient.delete(url, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response.data;
    }
};