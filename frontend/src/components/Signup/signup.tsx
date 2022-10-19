import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import { useMutation, useQueryClient } from '@tanstack/react-query';
import './signup.scss';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Signup() {
    const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation(createAccount, {
    onSuccess: () => {
      setEmail("");
      setFirstName("");
      setLastName("");
      setPassword("");
      setTimeout(() => { 
        navigate('/login', { replace: true });
    }, 3000);
    }
  })

  async function createAccount () {
    const data = { 
        email,
        first_name,
        last_name,
        password
     };
    const headers = { 
        'Content-Type': 'application/json'
    };
    await axios.put('http://localhost:3001/auth/signup', data, { headers })
        .then(response => {
            if (response.status === 201) {
                toast.success('Signup was succesful! Please Login', {
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
        <div className="signup">
            <h4>Enter your details to signup.</h4>
            <form onSubmit={handleSubmit}>
            <TextField
        helperText="Please enter your email"
        id=""
        label="email"
        color="success"
        value={email} onChange={(e) => setEmail(e.target.value)}
      />
      <TextField id="" label="first name" helperText="Please enter your first name" color="success" value={first_name} onChange={(e) => setFirstName(e.target.value)} />
      <TextField id="" label="last name" helperText="Please enter your last name" color="success" value={last_name} onChange={(e) => setLastName(e.target.value)} />
      <TextField id="" label="password" helperText="Please enter your password" color="success" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit" disabled={mutation.isLoading}>Signup</button>
            </form>
        </div>
    )
}

export default Signup