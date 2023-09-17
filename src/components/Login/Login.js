import React, { useContext, useState } from 'react';
import "./Login.css";
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';

const Login = () => {
    // context value 
    const { signIn } = useContext(AuthContext);

    const [signInError, setSignInError] = useState("");

    const navigate = useNavigate();


    // for previous location
    const location = useLocation()
    const from = location?.state?.from?.pathname || "/";

    const handleSignIn = (e) => {
        e.preventDefault();
        setSignInError("");

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;


        // sign up with email/pass
        signIn(email, password)
            .then(result => {
                form.reset();

                // send user to desired location after logging in
                navigate(from, { replace: true })
            })
            .catch(error => {
                setSignInError(error?.code || error?.message)
            })

        console.log(email, password);
    }


    return (
        <div className='vh-100 d-flex justify-content-center align-items-center'>
            <div className="form-container">
                <h4 className='form-title'>Login</h4>

                <form className='form' onSubmit={handleSignIn}>
                    <div className="form-control-bundle">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" className='form-control' required />
                    </div>

                    <div className="form-control-bundle">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" className='form-control' required />
                    </div>

                    {/* show sign up error */}
                    <p className="text-danger ps-2 fw-bold">{signInError}</p>


                    <input type="submit" value="Login" className='form-submit-btn' />
                    <p className='text-center pt-2 new-user'>New to Ema-John?
                        <Link to="/register" className='new-user-link'>Create New Account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;