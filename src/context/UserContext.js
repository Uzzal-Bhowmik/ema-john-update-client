import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import app from '../firebase/firebase.init';

// creating context
export const AuthContext = createContext("default-value");
// firebase auth
const auth = getAuth(app);


const UserContext = ({ children }) => {
    const [user, setUser] = useState({ displayName: "Uzzal Bhowmik" });
    const [loading, setLoading] = useState(true);


    //        SignUp, SignIn, SignOut Method With Email/Password

    const signUp = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const singingOut = () => {
        setLoading(true);
        return signOut(auth);
    }
    // --------------------------------------------------


    //      observe auth state changes
    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        })
        return () => unSubscribe;

    }, [])
    // --------------------------------------------


    // set context value
    const contextValue = { user, loading, signUp, signIn, singingOut };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;