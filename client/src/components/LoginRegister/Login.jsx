import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations.js';
import Auth from '../../utils/auth.js';

function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [login, { error }] = useMutation(LOGIN_USER);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await login({
                variables: {
                    ...formData
                }
            });

            Auth.login(data.login.token);
        } 
        catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="row w-100 justify-content-center flex-column flex-md-row">
                <div className="col-12 col-md-5 d-flex justify-content-center align-items-center text-center text-md-start pe-md-5">
                    <div className="text-center">
                        <h1 className=''>HubConnect</h1>
                        <p style={{ color: '#F63366' }}>Connect in Jesus</p> 
                    </div>
                </div>

                <div className="col-12 col-md-5 ps-md-5">
                    <form className="border border-5 rounded p-4 needs-validation" onSubmit={handleFormSubmit}>
                        <h2 className="text-center mb-4">Login</h2>
                        <div className="row gy-3">
                            <div className="col-12 has-validation form-floating">
                                <input
                                    id="usernameLoginInput"
                                    type="text"
                                    className={`form-control form-control-lg`}
                                    name="username"
                                    placeholder="Username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    required
                                    autoComplete='off'
                                    style={{ fontSize: '16px' }}
                                />
                                <label htmlFor="usernameLoginInput" className="ms-2">Username</label>
                            </div>

                            <div className="col-12 form-floating">
                                <input
                                    id="passwordLoginInput"
                                    type="password"
                                    className={`form-control form-control-lg`}
                                    name="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    required
                                    autoComplete='off'
                                    style={{ fontSize: '16px' }}
                                />
                                <label htmlFor="passwordLoginInput" className="ms-2">Password</label>
                            </div>

                            <div className="col-12">
                                <button
                                    type="submit"
                                    className="btn btn-lg w-100"
                                >
                                    Login
                                </button>
                            </div>

                            <div className="col-12">
                                <p className="text-center">
                                    Don't have an account? <span onClick={() => setAccountStep('register')} style={{ cursor: 'pointer', textDecoration: 'underline', color: '#F63366' }}>Sign up</span>
                                </p>
                                {error && <div className="login-error-feedback mt-3 mb-2">{error.message}</div>}
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;