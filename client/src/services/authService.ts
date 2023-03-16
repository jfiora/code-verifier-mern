import axiosConfig from '../utils/config/axios.config';

export const login = (email: string, password: string) => {
    let body = {
        email: email,
        password: password,
    };

    return axiosConfig.post('/auth/login', body);
};

export const register = (
    name: string,
    email: string,
    password: string,
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
