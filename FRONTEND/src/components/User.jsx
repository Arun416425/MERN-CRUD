import React, { useEffect, useState } from 'react'
import "./User.css"
import axios from 'axios'
import { Link } from 'react-router-dom';
import AddUser from '../adduser/AddUser';
import toast from "react-hot-toast";

const User = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://localhost:3000/api/users")
                setUsers(res.data)
            } catch (error) {
                console.log("Error while fetching data", error)
            }
        }
        fetchData()
    }, [])

    const deleteUser = async (userId) => {
        try {
            const res = await axios.delete(`http://localhost:3000/api/delete/user/${userId}`);

            // Update state only after successful API call
            setUsers((prev) => prev.filter((user) => user._id !== userId));

            toast.success(res.data.message, { position: "top-right" });
        } catch (err) {
            // Handle potential errors (e.g., show a toast notification)
            console.error("Error deleting user:", err);
            toast.error(err.response?.data?.message || "Failed to delete user");
        }
    };

    return (
        <div className='userTable'>
            <Link className='btn btn-primary' to="/add">Add User <i class="fa-solid fa-user-plus"></i></Link>
            {users.length === 0 ? (
                <div className="noData">
                    <h3>No users...</h3>
                </div>
            ) : (<table className='table table-bordered'>
                <thead>
                    <tr>
                        <th scope='col'>Sr.No</th>
                        <th scope='col'>Name</th>
                        <th scope='col'>Email</th>
                        <th scope='col'>Address</th>
                        <th scope='col'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => {
                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.address}</td>
                                <td className='actionBtns'>
                                    <Link to={`/update/` + user._id} class="btn btn-info"><i class="fa-solid fa-pen-to-square"></i></Link>
                                    <button onClick={() => deleteUser(user._id)} type="button" class="btn btn-danger"><i class="fa-solid fa-trash"></i></button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>)}
        </div>
    )
}

export default User