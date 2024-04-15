// src/ManagePenalties.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from "react-bootstrap/Table";
import { Link } from 'react-router-dom';

const ManagePenalties = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/admin/");
            setUsers(response.data.users);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    return (
        <div className='container mt-5'>
            <h3 className='mb-2'>إدارة الجزاءات</h3>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>الرقم</th>
                        <th>الاسم</th>
                        <th>البريد الإلكتروني</th>
                     
                        <th>الرقم الوطني</th>
                        <th>الإجراءات</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                          
                            <td>{user.national_id}</td>
                            <td>
                                <Link
                                    to={`/add-penalty/${user.id}/${user.name}`}
                                    className="btn btn gold-bg-color text-white"
                                >
                                    إضافة جزاء جديد +
                                </Link>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
};

export default ManagePenalties;
