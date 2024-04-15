// src/Managehousing.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from "react-bootstrap/Table";

const Managehousing = () => {
    const [users, setUsers] = useState([]);
    const [selectedUniversity, setSelectedUniversity] = useState(''); // حالياً لا يوجد اختيار

    useEffect(() => {
        fetchUsers(selectedUniversity);
    }, [selectedUniversity]);

    const fetchUsers = async (university) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/housing/getAcceptedStudents?universityName=${university}`);
            setUsers(response.data.acceptedStudents);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const allocateRoom = async (nationalId, userName, gender) => {
        try {
            const response = await axios.post(`http://localhost:5000/api/housing/?nationalId=${nationalId}`);
            fetchUsers(selectedUniversity);
            console.log(`تم تسكين ${userName} بنجاح.`);
        } catch (error) {
            console.error(`حدث خطأ أثناء تسكين ${userName}:`, error);
        }
    };

    const handleUniversityChange = (university) => {
        setSelectedUniversity(university);
    };

    return (
        <div className="container-fluid space-bottom">
            <div className="row">
                <nav id="sidebar" className="col-md-3 col-lg-2 col-sm-4 d-md-block bg-light sidebar">
                    <div className="sidebar-sticky">
                        <h3 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-2 ">
                            اختر الجامعه
                        </h3>
                        <ul className="nav flex-column">
                            <li className="nav-item">
                                <button className="adduni" onClick={() => handleUniversityChange('حلوان')}>
                                    حلوان
                                </button>
                            </li>
                            <li className="nav-item">
                                <button className="adduni" onClick={() => handleUniversityChange('حلوان الاهلية')}>
                                    حلوان الأهلية
                                </button>
                                {/* يمكنك إضافة المزيد من الجامعات حسب الحاجة */}
                            </li>
                        </ul>
                    </div>
                </nav>

                <main role="main" className="col-md-9 col-lg-10 col-sm-8 px-md-4 mt-5">
                    <h3>إدارة التسكين</h3>

                    <Table striped bordered hover >
                        <thead>
                            <tr>
                                <th>الرقم</th>
                                <th>الاسم</th>
                                <th>البريد الإلكتروني</th>
                                <th>الرقم الوطني</th>
                                <th>النوع</th>
                                <th>الإجراءات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users && users.length > 0 ? (
                                users.map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.national_id}</td>
                                        <td>{user.gender}</td>
                                        <td>
                                            <button
                                                className="btn btn gold-bg-color text-white"
                                                onClick={() => allocateRoom(user.national_id, user.name, user.gender)}
                                            >
                                                تسكين الطالب
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6">لا توجد بيانات حالياً</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                </main>
            </div>
        </div>
    );
};

export default Managehousing;
