import React, { useEffect, useState } from 'react'
import "./Update.css"
import { Link, useNavigate, useParams } from 'react-router-dom'
import axios from "axios"
import toast from "react-hot-toast";

const Update = () => {
    const users = {
        name: "",
        email: "",
        address: ""
    }

    const [user, setUser] = useState(users);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.put(`http://localhost:3000/api/update/user/${id}`, user)
            .then((response) => {
                toast.success(response.data.message, { position: 'top-right' })
                navigate("/")
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        axios.get(`http://localhost:3000/api/user/${id}`)
        .then((res) => {
            setUser(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [id])

    const inputHandler = (e) => {
        const { name, value } = e.target

        setUser({ ...user, [name]: value })
    }

    return (
        <div className='addUser'>
            <Link to='/' class="btn btn-secondary"><i class="fa-solid fa-backward"></i> Back</Link>
            <h2>Update User</h2>
            <form action="" className='addUserForm' onSubmit={handleSubmit}>
                <div className='inputGroup'>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" value={user.name} onChange={inputHandler} name='name' placeholder='Name' autoComplete='off' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={user.email} onChange={inputHandler} name='email' placeholder='Email' autoComplete='off' />
                </div>
                <div className='inputGroup'>
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" value={user.address} onChange={inputHandler} name='address' placeholder='Address' autoComplete='off' />
                </div>
                <div className='inputGroup'>
                    <button type="submit" class="btn btn-primary">Sumbit</button>
                </div>
            </form>
        </div>
    )
}

export default Update