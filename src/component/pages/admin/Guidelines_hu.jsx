// Guidelines_hu.js
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useLocation } from 'react-router-dom';

import './guidepage.css';  // Uncomment this line if you have a CSS file

export default function Guidelines_hu() {
  const location = useLocation();
  const [universityName, setUniversityName] = useState('حلوان'); // Default university name

  const [guidelines, setGuidelines] = useState('');
  const [isFormVisible, setIsFormVisible] = useState(false);

  useEffect(() => {
    fetchGuidelines();
  }, [universityName]);

  const fetchGuidelines = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/student/guidelines/?name=${universityName}`);
      
      // Check if response.data.guidelines is an object
      if (typeof response.data.guidelines === 'object' && response.data.guidelines !== null) {
        // If it's an object, convert it to a string
        setGuidelines(JSON.stringify(response.data.guidelines));
      } else {
        // If it's not an object, set it directly
        setGuidelines(response.data.guidelines || '');
      }
    } catch (error) {
      console.log("Error fetching guidelines:", error);
    }
  };

  const handleEditClick = (selectedUniversity) => {
    setIsFormVisible(true);
    setUniversityName(selectedUniversity);
  };

  const handleSaveClick = async () => {
    try {
      await axios.post(`http://localhost:5000/api/admin/guidelines?university_name=${universityName}`, {
        guidelines,
      });

      fetchGuidelines();
      setIsFormVisible(false);
      console.log("تم حفظ الإرشادات بنجاح");

    } catch (error) {
      console.log("حدث خطأ أثناء حفظ الإرشادات:", error);
    }
  };
  const handleUniversityChange = (selectedUniversity) => {
    setUniversityName(selectedUniversity);
  };
  return (
    <div className='main-container clearfix mb-5'>
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

      <div className='body-hu w-75 '>
        <h3>إرشادات التقديم لجامعة {universityName}</h3>
        <p >{guidelines}</p>

        <button className="btn btn main-bg-color text-white" onClick={() => handleEditClick(universityName)} >تعديل الإرشادات</button>

        {isFormVisible && (
          <div>
            <textarea
            className="form-control"
              value={guidelines}
              onChange={(e) => setGuidelines(e.target.value)}
              placeholder="إرشادات التقديم"
            />
            <button className="btn btn main-bg-color text-white" onClick={handleSaveClick}>حفظ</button>
          </div>
        )}
      </div>
    </div>
  );
}
