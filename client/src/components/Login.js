import React, { useState } from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";


    function Login({ user, setUser, setErrors, errors }) {
        const [newUser, setNewUser] = useState(false)
        console.log(errors)
    return (
        <>
            
            <div className="top">   
                <h1>Welcome To Recipe Codex!</h1>
            </div>
            <div className="container">
            {newUser ? (
                <div className="hero">
                    { errors ? <div className="errorMessage"><p>{errors.errors[0]}</p></div> : <></>}
                    <LoginForm setUser={setUser} setErrors={setErrors}/>
                    <p className="account">Don't have an account?</p>&nbsp;
                    <button onClick={() => setNewUser(false)}>Sign Up</button>
                </div>
            ) : (
            <div className="hero">
                { errors ? <div className="errorMessage"><p>{errors.errors[0]}</p></div> : <></>}
                <SignupForm setUser={setUser} setErrors={setErrors}/>
                <p className="account">Already have an account?&nbsp;</p>
                <button onClick={() => setNewUser(true)}>Log In</button>
            </div>
            )}
            </div>
        </>
        
    );
    }

export default Login;