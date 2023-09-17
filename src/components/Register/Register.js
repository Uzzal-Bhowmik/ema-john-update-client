import React, { useContext, useState } from 'react';
import "./Register.css";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';


const Register = () => {
    // context value 
    const { signUp } = useContext(AuthContext);

    const [signUpError, setSignUpError] = useState("");

    const navigate = useNavigate();

    const handleSignUp = (e) => {
        e.preventDefault();
        setSignUpError("");

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirm.value;

        if (password !== confirmPassword) {
            setSignUpError("Passwords did not match!")
            return;
        }

        // sign up with email/pass
        signUp(email, password)
            .then(result => {
                form.reset();
                navigate("/")
            })
            .catch(error => {
                setSignUpError(error?.code || error?.message)
            })

        console.log(email, password, confirmPassword);
    }

    return (
        <div className='vh-100 d-flex justify-content-center align-items-center'>
            <div className="form-container">
                <h4 className='form-title'>Sign Up</h4>

                <form className='form' onSubmit={handleSignUp}>
                    <div className="form-control-bundle">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" className='form-control' required />
                    </div>

                    <div className="form-control-bundle">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" className='form-control' required />
                    </div>

                    <div className="form-control-bundle">
                        <label htmlFor="confirm">Confirm Password</label>
                        <input type="password" name="confirm" className='form-control' required />
                    </div>

                    {/* show sign up error */}
                    <p className="text-danger ps-2 fw-bold">{signUpError}</p>

                    {/* sign up button */}
                    <input type="submit" value="Sign Up" className='form-submit-btn' />
                    <p className='text-center pt-2 new-user'>Already have an account?
                        <Link to="/login" className='new-user-link'>Log In</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Register;