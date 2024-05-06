import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './SignUp.scss';

const SignUp: React.FC = () => {
  const [username, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPass] = useState('');
  const [rePassword, setRePassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  }
  const initInform = async () => {
    setEmail('');
    setName('');
    setPass('');
    setRePassword('');
  }
  const goSignUp = async () => {
    if (!email.trim() || !password.trim() || !username.trim() || !rePassword.trim()) {
      alert("Please input information");
    }
    else {
      if (rePassword !== password) {
        alert("Password and Re-Enter password is not match");
      }
      else {
        const newUser = {
          email: email,
          userName: username,
          password: password
        }
        axios.post('http://localhost:8080/user/add', newUser)
          .then((response) => {
            initInform();
            switchPage();
          })
          .catch((err) => {
            alert("Email is already exist");
          })
      }
    }
  }
  const switchPage = async () => {
    navigate("/login");
  }

  return (
    <div className="auto-form-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">UserName</label>
        <input value={username} onChange={(e) => setName(e.target.value)} type="username" placeholder="username" name="username" />
        <label htmlFor="email">email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email" name="email" />
        <label htmlFor="password">password</label>
        <input value={password} onChange={(e) => setPass(e.target.value)} type="password" placeholder="password" name="password" />
        <label htmlFor="repassword">password</label>
        <input value={rePassword} onChange={(e) => setRePassword(e.target.value)} type="password" placeholder="repassword" name="repassword" />
        <button type="submit" onClick={goSignUp}>Sign Up</button>
        <button
          className="link_btn"
          onClick={switchPage}
          style={{ marginTop: '20px' }} // Inline style
        >
          Already have an account? Login now
        </button>
      </form>
    </div>
  )
};

export default SignUp;