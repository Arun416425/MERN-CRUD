import React, { useState } from 'react'
import "./AddUser.css"
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import toast from "react-hot-toast";

const AddUser = () => {
    const users = {
        name: "",
        email: "",
        address: ""
    }

    const [user, setUser] = useState(users);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.post("http://localhost:3000/api/user", user)
            .then((response) => {
                toast.success(response.data.message, {position:'top-right'})
                navigate("/")
            })
            .catch((err) => console.log(err))
    }

    const inputHandler = (e) => {
        const { name, value } = e.target

        setUser({ ...user, [name]: value })
        console.log("Name", name, value)
    }

    return (
        <div className='addUser'>
            <Link to='/' class="btn btn-secondary"><i class="fa-solid fa-backward"></i> Back</Link>
            <h2>Add New User</h2>
            <form action="" className='addUserForm' onSubmit={handleSubmit}>
                <div className='inputGroup'>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" onChange={inputHandler} name='name' placeholder='Name' autoComplete='off' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" onChange={inputHandler} name='email' placeholder='Email' autoComplete='off' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" onChange={inputHandler} name='address' placeholder='Address' autoComplete='off' />
                </div>
                <div className='inputGroup'>
                    <button type="submit" class="btn btn-primary">Sumbit</button>
                </div>
            </form>
        </div>
    )
}

export default AddUser