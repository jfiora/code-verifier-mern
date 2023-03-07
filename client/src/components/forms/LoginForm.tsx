import React from 'react';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login } from '../../services/authService';
import { AxiosResponse } from 'axios';

const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const LoginForm = () => {
    const initialCredentials = {
        email: '',
        password: '',
    };

    return (
        <div>
            <h4>Login Form</h4>
            <Formik
                initialValues={initialCredentials}
                validationSchema={loginSchema}
                onSubmit={async (values) => {
                    login(values.email, values.password)
                        .then((res: AxiosResponse) => {
                            if (res.status === 200) {
                                if (res.data.token) {
                                    sessionStorage.setItem(
                                        'sessionToken',
                                        res.data.token
                                    );
                                } else {
                                    throw new Error(
                                        'Error Generating Login Token'
                                    );
                                }
                            } else {
                                throw new Error('Invalid Credentials');
                            }
                        })
                        .catch((err) => {
                            console.error(
                                `[LOGIN ERROR] Something went wrong: ${err}`
                            );
                        });
                }}
            >
                {({
                    values,
                    touched,
                    errors,
                    isSubmitting,
                    handleChange,
                    handleBlur,
                }) => (
                    <Form>
                        <label htmlFor='email'>Email</label>
                        <Field
                            name='email'
                            type='email'
                            placeholder='example@email.com'
                        />
                        <ErrorMessage name='email' component='div' />

                        <label htmlFor='password'>Password</label>
                        <Field
                            name='password'
                            type='password'
                            placeholder='Password'
                        />
                        <ErrorMessage name='password' component='div' />

                        <button type='submit'>Login</button>
                        {isSubmitting ? <p>Checking credentials...</p> : null}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default LoginForm;
