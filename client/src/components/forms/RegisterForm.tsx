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
        age: 18,
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
            .required('Confirm password1 is required'),
        age: Yup.number()
            .required('Age is required')
            .min(18, 'Age must be at least 18'),
    });

    return (
        <div>
            <h4>register form</h4>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                    register(
                        values.name,
                        values.email,
                        values.password,
                        values.age
                    )
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
                        <label htmlFor='name'>Name</label>
                        <Field name='name' type='text' placeholder='name' />
                        <ErrorMessage name='name' component='div' />

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

                        <label htmlFor='confirm'>Confirm Password</label>
                        <Field
                            name='confirm'
                            type='password'
                            placeholder='Confirm password'
                        />
                        <ErrorMessage name='confirm' component='div' />

                        <label htmlFor='age'>Age</label>
                        <Field name='age' type='number' placeholder='age' />
                        <ErrorMessage name='age' component='div' />

                        <button type='submit'>Login</button>
                        {isSubmitting ? <p>Checking credentials...</p> : null}
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default RegisterForm;
