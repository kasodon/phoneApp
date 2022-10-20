import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import UserContextProvider from "../Context/UserContext";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import './login.scss';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {setId, setToken, setIsAuth} = useContext(UserContextProvider);

  const mutation = useMutation(login, {
    onSuccess: () => {
      setEmail("");
      setPassword("");
      setTimeout(() => { 
        navigate('/dashboard', { replace: true });
    }, 3000);
    }
  })

  async function login () {
    const data = { 
        email,
        password
     };
    const headers = { 
        'Content-Type': 'application/json'
    };
    await axios.post('http://localhost:3001/auth/login', data, { headers })
        .then(response => {
            console.log(response)
            if (response.status === 200) {
              setToken(response.data.token)
              setId(response.data.id)
              setIsAuth(true)
                localStorage.setItem('token', JSON.stringify(response.data.token));
                toast.success('Login was succesful! Redirecting', {
                                position: "top-right",
                                autoClose: 3000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                                });
            }
        })
        .catch(error => {
            console.error('There was an error!', error);
        });
  }

  function handleSubmit (e: any) {
    e.preventDefault()
    mutation.mutate()
  }

    return (
        <div className="login">
            <h4>Enter your email and password to continue.</h4>
            <form onSubmit={handleSubmit}>
            <TextField
        helperText="Please enter your email"
        id=""
        label="email"
        color="success"
        value={email} onChange={(e) => setEmail(e.target.value)}
      />
      <TextField id="" label="password" helperText="Please enter your password" color="success" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit" disabled={mutation.isLoading}>Login</button>
            </form>
        </div>
    )
}

export default Login