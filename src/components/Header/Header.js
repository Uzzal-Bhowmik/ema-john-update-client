import React, { useContext } from 'react';
import "./Header.css";
import logo from "../../images/Logo.png";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';

const Header = () => {
    // Context value
    const { user, singingOut } = useContext(AuthContext);
    console.log("current logged in user: ", user);

    // Sign out
    const handleSignOut = () => {
        singingOut()
            .then(() => { console.log("signed out successfully") })
            .catch(() => { })
    }

    return (
        <div>
            <nav>
                <div className='nav-content'>
                    <div>
                        <Link to="/" >
                            <img src={logo} alt="logo" width="80%" />
                        </Link>
                    </div>

                    <div className='nav-links'>
                        <Link to="/">Shop</Link>
                        <Link to="/orders">Orders</Link>
                        <Link to="/inventory">Manage Inventory</Link>
                        <Link to="/about">About</Link>
                    </div>

                    {/* buttons */}
                    <div>
                        {
                            (user?.uid || user?.email) && (
                                <span className='fw-bold text-white my-0 me-2'>👋 Hi, {user?.displayName || user?.email}</span>
                            )


                        }


                        {user?.uid || user?.email ?

                            <button className="btn btn-danger text-white" onClick={handleSignOut}>
                                Sign Out
                            </button>
                            :
                            <>
                                <Link to="/login">
                                    <button className="btn btn-warning me-3">
                                        Log In
                                    </button>
                                </Link>

                                <Link to="/register">
                                    <button className="btn btn-outline-warning text-white me-3">
                                        Sign Up
                                    </button>
                                </Link></>
                        }


                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Header;