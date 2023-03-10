import React from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { register } from '../../services/authService';
import { AxiosResponse } from 'axios';

const RegisterForm = () => {
    const initialValues = {
        name: '',
        email: '',
        password: '',
        confirm: '',
        age: '',
    };
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        email: Yup.string()
            .required('Email is required')
            .email('Invalid email address'),
        password: Yup.string()
            .required('Password is required')
            .min(8, 'Password must be at least 8 characters'),
        confirm: Yup.string()
            .when('password', {
                is: (val: string) => (val && val.length > 0 ? true : false),
                then: Yup.string().oneOf(
                    [Yup.ref('password')],
                    'Both password need to be the same'
                ),
            })
            .required('Confirm password is required'),
        age: Yup.number()
            .required('Age is required')
            .min(18, 'Age must be at least 18'),
    });

    return (
        <div>
            <h4>register form</h4>
        </div>
    );
};

export default RegisterForm;
