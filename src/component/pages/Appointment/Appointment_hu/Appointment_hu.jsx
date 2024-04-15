// Inside Appointment_hu.js
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import './Appointment_hu.css';

export default function Appointment_hu() {
  const location = useLocation();
  const [universityName, setUniversityName] = useState('Helwan'); // Default university name

  const [tableData, setTableData] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    university_name: '',
    start_date: '',
    end_date: '',
    category: ''
  });

  useEffect(() => {
    fetchData();
  }, [universityName]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/student/GetAppointment?universityName=${universityName}`);
      setTableData(response.data.appointments);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const handleAddClick = () => {
    setIsFormVisible(true);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFormVisible(false);
    try {
      const response = await axios.post("http://localhost:5000/api/admin/Appointment", formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      fetchData();

      console.log("تمت إضافة البيانات بنجاح");

      setFormData({
        university_name: '',
        start_date: '',
        end_date: '',
        category: ''
      });

    } catch (error) {
      console.log("حدث خطأ أثناء إضافة البيانات:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin/Appointment/?id=${id}`);
      fetchData();
      console.log("تم حذف البيانات بنجاح");
    } catch (error) {
      console.log("حدث خطأ أثناء حذف البيانات:", error);
    }
  };

  const handleUniversityChange = (selectedUniversity) => {
    setUniversityName(selectedUniversity);
  };

  return (
    <>
      <div className='main-container clearfix'>
          <nav id="sidebar" className="col-md-3 col-lg-2 col-sm-auto d-md-block bg-light sidebar">
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

        <div className='body-hu'>
          <h3   className='year mt-2'>العام 2023/2024</h3 >
          <table border="1" cellPadding="12" className="tableA  mb-4">
            <tbody>
              {tableData.map((row, index) => (
                <React.Fragment key={index}>
                  <tr>
                    <td>اسم الجامعة</td>
                    <td>{row.university_id}</td>
                  </tr>
                  <tr>
                    <td>تاريخ بدء التقديم</td>
                    <td>{row.start_date}</td>
                  </tr>
                  <tr>
                    <td>تاريخ انتهاء التقديم</td>
                    <td>{row.end_date}</td>
                  </tr>
                  <tr>
                    <td>الفئة</td>
                    <td>{row.category}</td>
                  </tr>
                  <tr>
                    <td>
                      <button className="btn btn-danger" onClick={() => handleDelete(row.id)}>حذف</button>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>

          <button className='btn btn main-bg-color text-white mb-5' onClick={handleAddClick}>
            اضافة
          </button>

          {isFormVisible && (
            <form onSubmit={handleSubmit}>
              <input className="form-control p-2 m-3 w-25"
                type="text"
                name="university_name"
                value={formData.university_name}
                onChange={handleInputChange}
                placeholder="اسم الجامعة"
              />
             <input className="form-control p-2 m-3 w-25"
              type="text"
              name="start_date"
              value={formData.start_date}
              onChange={handleInputChange}
              placeholder="تاريخ بدء التقديم"
            />
            <input className="form-control p-2 m-3 w-25"
              type="text"
              name="end_date"
              value={formData.end_date}
              onChange={handleInputChange}
              placeholder="تاريخ انتهاء التقديم"
            />
            <input className="form-control p-2 m-3 w-25"
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              placeholder="الفئة"
            />
            <button className='btn btn main-bg-color text-white mb-5' type="submit">حفظ</button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
