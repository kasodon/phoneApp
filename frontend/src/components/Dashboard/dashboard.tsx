import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import UserContextProvider from "../Context/UserContext";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import './dashboard.scss';
import TextField from '@mui/material/TextField';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import male from '../../assets/img/male.png';
import female from '../../assets/img/female.png';

function Dashboard() {
const [first_name, setFirstName] = useState("");
const [last_name, setLastName] = useState("");
const [gender, setGender] = useState("");
const [phone, setPhone] = useState("");
// const queryClient = useQueryClient();
// const navigate = useNavigate();
const {id, token} = useContext(UserContextProvider);
const [contacts, setContacts] = useState([]);
const [mal, setMal] = useState([]);
const [femal, setFemal] = useState([]);

const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

useEffect(() => {
    getContacts();
  }, []);

  const create = useMutation(createContacts, {
    onSuccess: () => {
    //   setEmail("");
    //   setPassword("");
    }
  })

  async function getContacts () {
    const headers = { 
        'Authorization': `Bearer ${token}`
    };
    await axios.get('http://localhost:3001/crud/contacts', { headers })
        .then(response => {
            console.log(response)
            if (response.status === 200) {
                setContacts(response.data.contacts)
                setMal(response.data.contacts.filter(contact => contact.gender === 'male'))
                setFemal(response.data.contacts.filter(contact => contact.gender === 'female'))
                toast.success('Data fetched successfully!', {
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

  async function createContacts () {
    const data = { 
        first_name,
        last_name,
        gender,
        phone,
        userId: id
     };
    const headers = { 
        'Authorization': `Bearer ${token}`
    };
    await axios.post('http://localhost:3001/crud/contact', data, { headers })
        .then(response => {
            console.log(response)
            if (response.status === 201) {
                toast.success('Contact created successfully!', {
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

//   function handleSubmit (e: any) {
//     e.preventDefault()
//     mutation.mutate()
//   }

  function handleCreatSubmit (e: any) {
    e.preventDefault()
    create.mutate()
  }

    return (
        <div className="dashboard">
            <div className="title">
                <h2>Hey there, welcome!</h2>
            </div>
            <div className="info">
                <div className="item green">
                <div className="num one">{contacts.length > 0 ? contacts.length : 0}</div>
                    <div className="text">Total</div>
                </div>
                <div className="item orange">
                <div className="num one">{mal.length > 0 ? mal.length : 0}</div>
                    <div className="text">Male</div>
                </div>
                <div className="item pink">
                <div className="num one">{femal.length > 0 ? femal.length : 0}</div>
                    <div className="text">Female</div>
                </div>
            </div>
            <div className="contacts">
                <div className="con">
                <h3>All Contacts</h3>
                <button onClick={handleClickOpen}>Create</button>
                </div>
                <div className="box">
                {contacts.map(contact=> (
                <div className="single">
                <div className="single-one">
                    <img src={male} alt="" />
                    <p>{contact.first_name} {contact.last_name}</p>
                </div>
                <div className="single-two">
                    <button className="edit">Edit</button>
                    <button className="delete">Delete</button>
                </div>
            </div>
                    ))}
                </div>
            </div>
            <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Contact</DialogTitle>
        <DialogContent>
        <form onSubmit={handleCreatSubmit}>
        <TextField fullWidth id="" label="first name" helperText="Please enter your first name" color="success" value={first_name} onChange={(e) => setFirstName(e.target.value)} />
      <TextField fullWidth id="" label="last name" helperText="Please enter your last name" color="success" value={last_name} onChange={(e) => setLastName(e.target.value)} />
      <TextField fullWidth id="" label="gender" helperText="Please enter your gender" color="success" value={gender} onChange={(e) => setGender(e.target.value)} />
      <TextField fullWidth id="" label="phone" helperText="Please enter your phone" color="success" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <button type="submit" disabled={create.isLoading}>Create</button>
        </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
        </div>
    )
}

export default Dashboard