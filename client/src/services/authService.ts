import axiosConfig from '../utils/config/axios.config';

export const login = (email: string, password: string) => {
    let body = {
        email: email,
        password: password,
    };

    return axiosConfig.post('/auth/login', body);
};

export const register = (
    email: string,
    password: string,
    name: string,
    age: number
) => {
    let body = {
        name: name,
        email: email,
        password: password,
        age: age,
    };

    return axiosConfig.post('/auth/register', body);
};
