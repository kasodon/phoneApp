import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import UserContextProvider from "../Context/UserContext";
import { useMutation } from "@tanstack/react-query";
import "./dashboard.scss";
import TextField from "@mui/material/TextField";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import male from "../../assets/img/male.png";
import female from "../../assets/img/female.png";

function Dashboard() {
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [contactId, setContactId] = useState("");
  const { id, token, userInfo } = useContext(UserContextProvider);
  const [contacts, setContacts] = useState([]);
  const [mal, setMal] = useState([]);
  const [femal, setFemal] = useState([]);

  const [open, setOpen] = React.useState(false);
  const [openCreate, setOpenCreate] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenCreate = () => {
    setOpenCreate(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  useEffect(() => {
    getContacts();
  }, []);

  const create = useMutation(createContacts, {
    onSuccess: () => {
      //   setEmail("");
      //   setPassword("");
    },
  });

  const update = useMutation(updateContacts, {
    onSuccess: () => {
      //   setEmail("");
      //   setPassword("");
    },
  });

  async function getContact(val: any) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios
      .get(`http://localhost:3001/crud/contact/${val}`, config)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setFirstName(response.data.first_name);
          setLastName(response.data.last_name);
          setGender(response.data.gender);
          setPhone(response.data.phone);
          toast.success("Contact fetched successfully!", {
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
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  async function getContacts() {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios
      .get(`http://localhost:3001/crud/contacts/${id}`, config)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          setContacts(response.data.contacts);
          setMal(
            response.data.contacts.filter(
              (contact) => contact.gender === "male"
            )
          );
          setFemal(
            response.data.contacts.filter(
              (contact) => contact.gender === "female"
            )
          );
          toast.success("Data fetched successfully!", {
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
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  async function createContacts() {
    const data = {
      first_name,
      last_name,
      gender,
      phone,
      userId: id,
    };
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    await axios
      .post("http://localhost:3001/crud/contact", data, { headers })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          toast.success("Contact created successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  async function updateContacts() {
    const data = {
      first_name,
      last_name,
      gender,
      phone,
      userId: id,
    };
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    await axios
      .put(`http://localhost:3001/crud/contact/${contactId}`, data, { headers })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          toast.success("Contact updated successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  async function deleteContact(id) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        userId: id,
      },
    };
    await axios
      .delete(`http://localhost:3001/crud/contact/${id}`, config)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          toast.success("Contact deleted successfully!", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  }

  function handleCreatSubmit(e: any) {
    e.preventDefault();
    create.mutate();
  }

  function handleUpdateSubmit(e: any) {
    e.preventDefault();
    update.mutate();
  }

  return (
    <div className="dashboard">
      <div className="title">
        <h2>{`Hey ${userInfo}, welcome!`}</h2>
      </div>
      <div className="info">
        <div className="item green">
          <div className="num one">
            {contacts.length > 0 ? contacts.length : 0}
          </div>
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
          <button onClick={handleClickOpenCreate}>Create</button>
        </div>
        <div className="box">
          {contacts.map((contact) => (
            <div className="single">
              <div className="single-one">
                {contact.gender === "male" ? (
                  <img src={male} alt="" />
                ) : (
                  <img src={female} alt="" />
                )}
                <div className="both">
                  <p>
                    {contact.first_name} {contact.last_name}
                  </p>
                  <p>☎ {contact.phone}</p>
                </div>
              </div>
              <div className="single-two">
                <button
                  onClick={() => {
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    handleClickOpen();
                    getContact(`${contact.id}`);
                    setContactId(contact.id);
                  }}
                  className="edit"
                >
                  Edit
                </button>
                <button
                  onClick={() => {
                    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
                    deleteContact(contact.id);
                  }}
                  className="delete"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Dialog open={openCreate} onClose={handleClose}>
        <DialogTitle>Create New Contact</DialogTitle>
        <DialogContent>
          <form onSubmit={handleCreatSubmit}>
            <TextField
              fullWidth
              id=""
              label="first name"
              helperText="Please enter your first name"
              color="success"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              fullWidth
              id=""
              label="last name"
              helperText="Please enter your last name"
              color="success"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              fullWidth
              id=""
              label="gender"
              helperText="Please enter your gender"
              color="success"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
            <TextField
              fullWidth
              id=""
              label="phone"
              helperText="Please enter your phone"
              color="success"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button type="submit" disabled={create.isLoading}>
              Create
            </button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseCreate}>Close</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Contact</DialogTitle>
        <DialogContent>
          <form onSubmit={handleUpdateSubmit}>
            <TextField
              fullWidth
              id=""
              label="first name"
              helperText="Please enter your first name"
              color="success"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <TextField
              fullWidth
              id=""
              label="last name"
              helperText="Please enter your last name"
              color="success"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
            />
            <TextField
              fullWidth
              id=""
              label="gender"
              helperText="Please enter your gender"
              color="success"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            />
            <TextField
              fullWidth
              id=""
              label="phone"
              helperText="Please enter your phone"
              color="success"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <button type="submit" disabled={create.isLoading}>
              Update
            </button>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Dashboard;
