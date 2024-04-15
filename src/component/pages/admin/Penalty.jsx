// src/Penalty.js

import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';

import axios from 'axios';
import "./penalty.css";

const Penalty = () => {
  const [penalties, setPenalties] = useState([]);

  useEffect(() => {
    fetchPenalties();
  }, []);

  const fetchPenalties = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/admin/retribution");
      setPenalties(response.data.penalties);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDeleteClick = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/retribution?id=${id}`);
      setPenalties(prevPenalties => prevPenalties.filter(penalty => penalty.id !== id));
      console.log('Penalty deleted successfully');
    } catch (error) {
      console.error('Error deleting penalty:', error);
    }
  };

  return (
    <>


<div className='container mt-5'>
            <h3 className='mb-3'> الجزاءات</h3>

            <Table striped bordered hover>
            <thead>
          <tr>
            <th>رقم الجزاء</th>
            <th>رقم المستخدم</th>
            <th>الاسم</th>
            <th>الجزاء</th>
            <th>السبب</th>
            <th>التاريخ</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
                <tbody>
          {penalties.map((penalty) => (
            <tr key={penalty.id}>
              <td>{penalty.id}</td>
              <td>{penalty.user_id}</td>
              <td>{penalty.name}</td>
              <td>{penalty.absence_type}</td>
              <td>{penalty.absence_reason}</td>
              <td>{new Date(penalty.absence_date).toLocaleDateString()}</td>
              <td>
                <button className="btn btn-danger" onClick={() => handleDeleteClick(penalty.id)}>
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
            </Table>
        </div>





   {/* <div className="container">
   <div className="header d-flex justify-content-between mb-5">
        <h1 className="text-center">الجزاءات</h1>
       
      </div>
      <p>الجزاءات</p>
      <table className='tableA'>
        <thead>
          <tr>
            <th>رقم الجزاء</th>
            <th>رقم المستخدم</th>
            <th>الاسم</th>
            <th>الجزاء</th>
            <th>السبب</th>
            <th>التاريخ</th>
            <th>الإجراءات</th>
          </tr>
        </thead>
        <tbody>
          {penalties.map((penalty) => (
            <tr key={penalty.id}>
              <td>{penalty.id}</td>
              <td>{penalty.user_id}</td>
              <td>{penalty.name}</td>
              <td>{penalty.absence_type}</td>
              <td>{penalty.absence_reason}</td>
              <td>{new Date(penalty.absence_date).toLocaleDateString()}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDeleteClick(penalty.id)}>
                  حذف
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
   </div> */}
    </>
  );
}

export default Penalty;
