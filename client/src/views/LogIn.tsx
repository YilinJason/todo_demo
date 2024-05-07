import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

const LogIn: React.FC = () => {

    const [email, setEmail] = useState('');
    const [password, setPass] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        initInput();
    }
    // initlaize input
    const initInput = () => {
        setEmail('');
        setPass('');
    }
    const goLogIn = async () => {
        try {
            if (!email.trim() || !password.trim()) {
                alert("pleace input information!")
            }
            else {
                const user = {
                    email: email,
                    password: password
                }
                axios.post('http://localhost:8080/user/login', user)
                    .then((response) => {
                        console.log(response.data);
                        localStorage.setItem("userName", response.data.userName);
                        localStorage.setItem("userId", response.data.userId);
                        navigate("/HomePage");
                    })
            }
        } catch (err) {
            alert('log in failed')
        }
    }
    const switchPage = async () => {
        navigate("/signup");
    }


    return (
        <div className="auto-form-container">
            <form className="login_form" onSubmit={handleSubmit}>
                <label htmlFor="email">email</label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="ex@gmail.com" name="email" />
                <label htmlFor="password">password</label>
                <input value={password} onChange={(e) => setPass(e.target.value)} type="password" placeholder="********" name="email" />
                <button type="submit" onClick={goLogIn}>Log In</button>
                <button className="link_btn" onClick={switchPage}>Don't have an account? Signup now</button>
            </form>
        </div>
    )
};

export default LogIn;