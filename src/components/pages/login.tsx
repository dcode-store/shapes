import React, { useState, useEffect } from 'react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

import Spinner from '../atom/spinner';
import { login } from '../../api/loginApi';
import { useLocalStorage } from '../../hooks/useLocalstorage';

import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [values, setValues] = useState({
        username: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({
        message: "",
        status: 0,
        detail: ""
    });

    const [authToken, setAuthToken] = useLocalStorage('auth', null)
    const navigate = useNavigate();



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({
            ...values,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const form = new FormData();
            form.append('username', values.username);
            form.append('password', values.password);

            setIsLoading(true);
            const response = await login(form);

            if (response?.status === 200) {
                setAuthToken(response.data);
                navigate('/');
            } else {
                setError({
                    message: response?.data?.detail || "Failed to login",
                    status: response?.status || 500,
                    detail: response?.data.detail

                });
            }

        }
        catch (error) {
            console.error('login error:', error);
            setError({
                message: "Failed to login",
                status: 500,
                detail: "Internal Server Error"
            });
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-32 w-auto"
                        src={logo}
                        alt="Shapes"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={(e) => handleSubmit(e)}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input
                                    id="username"
                                    name="username"
                                    type="email"
                                    onChange={handleChange}
                                    autoComplete="username"
                                    value={values.username}
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-stone-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                                <div className="text-sm">
                                    <Link to="/contact" className="font-semibold text-stone-600 hover:text-stone-500">
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    onChange={handleChange}
                                    value={values.password}
                                    autoComplete="current-password"
                                    required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-stone-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            {error?.message && <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                                {error?.message}
                            </div>}
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-stone-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-stone-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-600"
                            >
                                {isLoading ? <Spinner /> : "Sign in"}
                            </button>
                        </div>
                    </form>
                </div >
            </div >
        </>
    )
}

export default Login;