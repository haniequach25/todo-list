import axios from 'axios';
import queryString from 'query-string';

const axiosClient = axios.create({
    baseURL: "https://mvn-task-manager.work",
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params),
});

export default axiosClient