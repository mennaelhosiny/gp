// App.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Requests.css';

export default function Requests() {
  const [data, setData] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRowId, setExpandedRowId] = useState(null);
  const [university, setUniversity] = useState('حلوان');

  useEffect(() => {
    fetchData();
  }, [university]);

  const fetchData = async () => {
    try {
      const name = 'اسم-الطالب';
      const response = await axios.get(`http://localhost:5000/api/employee?name=${name}&university_name=${university}`);

      if (Array.isArray(response.data.data)) {
        setData(response.data.data);
      } else {
        console.error('تنسيق البيانات غير صحيح.');
        setError('تنسيق البيانات غير صحيح.');
      }

      setLoading(false);
    } catch (error) {
      console.error(error);
      setError('حدث خطأ أثناء جلب البيانات.');
      setLoading(false);
    }
  };

  const handleStudentClick = (student) => {
    if (expandedRowId === student.id) {
      setExpandedRowId(null);
    } else {
      setExpandedRowId(student.id);
    }
    setSelectedStudent(student);
  };

  const handleAccept = async () => {
    if (selectedStudent) {
      try {
        await axios.post(`http://localhost:5000/api/employee?id=${selectedStudent.id}`);
        fetchData();
      } catch (error) {
        console.error('حدث خطأ أثناء قبول الطالب.', error);
      }
    }
  };

  const handleReject = async () => {
    if (selectedStudent) {
      try {
        await axios.post(`http://localhost:5000/api/employee/reject?id=${selectedStudent.id}`);
        fetchData();
      } catch (error) {
        console.error('حدث خطأ أثناء رفض الطالب.', error);
      }
    }
  };

  const handleUniversityChange = (selectedUniversity) => {
    setUniversity(selectedUniversity);
  };

  return (
    <div>
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

      <div className=" main-content clearfix  pt-5  ">
        <h3 >طلبات الالتحاق</h3>
        {loading && <p>جاري التحميل...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && (
          <table border="1" cellPadding="6" className="tableA " >
            <tbody>
              {data.length > 0 ? (
                data.map((item, index) => (
                  <React.Fragment key={item.id}>
                    <tr onClick={() => handleStudentClick(item)} style={{ cursor: 'pointer' }}>
                      <td>{index + 1}</td>
                      <td>{item.name}</td>
                    </tr>
                    {expandedRowId === item.id && (
                      <tr>
                        <td colSpan="2">
                        <div className="custom-columns">
                                  <p className="mb-3"><span className="bold-label">اسم الطالب:</span> {selectedStudent.name}</p>
                                  <p className="mb-3"><span className="bold-label">نوع الطالب:</span> {selectedStudent.student_type}</p>
                                  <p className="mb-3"><span className="bold-label">الجامعة:</span> {selectedStudent.university_id}</p>
                                  <p className="mb-3"><span className="bold-label">الجنسية:</span> {selectedStudent.nationality}</p>
                                  <p className="mb-3"><span className="bold-label">الرقم القومي:</span> {selectedStudent.national_id}</p>
                                  <p className="mb-3"><span className="bold-label">تاريخ الميلاد:</span> {selectedStudent.date_of_birth}</p>
                                  <p className="mb-3"><span className="bold-label">مكان الميلاد:</span> {selectedStudent.place_of_birth}</p>
                                  <p className="mb-3"><span className="bold-label">النوع:</span> {selectedStudent.gender}</p>
                                  <p className="mb-3"><span className="bold-label">الديانة:</span> {selectedStudent.religion}</p>
                                  <p className="mb-3"><span className="bold-label">العنوان:</span> {selectedStudent.residence_address}</p>
                                  <p className="mb-3"><span className="bold-label">العنوان بالتفصيل:</span> {selectedStudent.detailed_address}</p>
                                  <p className="mb-3"><span className="bold-label">البريد الإلكتروني:</span> {selectedStudent.email}</p>
                                  <p className="mb-3"><span className="bold-label">التليفون:</span> {selectedStudent.mobile_number}</p>
                                  <p className="mb-3"><span className="bold-label">الرقم القومي للأب:</span> {selectedStudent.father_national_id}</p>
                                  <p className="mb-3"><span className="bold-label">اسم الأب:</span> {selectedStudent.father_name}</p>
                                  <p className="mb-3"><span className="bold-label">وظيفة الأب:</span> {selectedStudent.father_occupation}</p>
                                  <p className="mb-3"><span className="bold-label">تليفون الأب:</span> {selectedStudent.father_phone_number}</p>
                                  <p className="mb-3"><span className="bold-label">اسم ولي الأمر:</span> {selectedStudent.guardian_name}</p>
                                  <p className="mb-3"><span className="bold-label">الرقم القومي لولي الأمر:</span> {selectedStudent.guardian_national_id}</p>
                                  <p className="mb-3"><span className="bold-label">تليفون ولي الأمر:</span> {selectedStudent.guardian_phone_number}</p>
                                  <p className="mb-3"><span className="bold-label">حالة الوالدين:</span> {selectedStudent.parents_status}</p>
                                  <p className="mb-3"><span className="bold-label">الكلية:</span> {selectedStudent.college}</p>
                                  <p className="mb-3"><span className="bold-label">المستوى:</span> {selectedStudent.level}</p>
                                  <p className="mb-3"><span className="bold-label">تقدير العام الماضي:</span> {selectedStudent.previous_academic_year_gpa}</p>
                                  <p className="mb-3"><span className="bold-label">حالة الطلب:</span> {selectedStudent.status}</p>
                                  <p className="mb-3"><span className="bold-label">كلمة المرور:</span> {selectedStudent.password.replace(/./g, '*')}</p>
                                  <p className="mb-3"><span className="bold-label">اسم الجامعة:</span> {selectedStudent.university_name}</p>
                                  <p className="mb-3"><span className="bold-label">حالة السكن في السنوات الماضية:</span> {selectedStudent.Housing_in_previous_years}</p>
                                  <p className="mb-3"><span className="bold-label">نوع السكن:</span> {selectedStudent.housing_type}</p>
                                  <p className="mb-3"><span className="bold-label">سكن العائلة بالخارج:</span> {selectedStudent.family_abroad}</p>
                                  <p className="mb-3"><span className="bold-label">حالات خاصة:</span> {selectedStudent.special_needs}</p>
                                  <p className="mb-3"><span className="bold-label">نوع الثانوية:</span> {selectedStudent.Secondary_Division}</p>
                                  <p className="mb-3"><span className="bold-label">مجموع الثانوية بالدرجات:</span> {selectedStudent.Total_grades_high_school}</p>
                                  <p className="mb-3"><span className="bold-label">رقم جواز السفر:</span> {selectedStudent.Passport_number}</p>
                                  <p className="mb-3"><span className="bold-label">جهة صدور جواز السفر:</span> {selectedStudent.Passport_issuing_authority}</p>
                                  <p className="mb-3"><span className="bold-label">الفئة:</span> {selectedStudent.category}</p>
                                  <p className="mb-3"><span className="bold-label">المسافة:</span> {selectedStudent.distance}</p>
                      </div>
                          <button className='btn btn gold-bg-color' onClick={handleAccept}>قبول</button>
                          <button className='btn btn-danger m-2' onClick={handleReject}>رفض</button>
                        </td>
                      </tr>
                    )}
                  </React.Fragment >
                ))
              ) : (
                <tr>
                  <td colSpan="2">لا توجد بيانات حالياً</td>
                </tr>
              )}
            </tbody>
          </table >
        )}
      </div>
    </div>
  );
}
