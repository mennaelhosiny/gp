
import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './sidebarguide.css';

export default function Guidelines() {
  return (
    <>
      <div className='f-bar'>
        <div className='adduni'><p>اختر الجامعة</p></div>
      </div>
      <div className='sidebar'>
        {/* Link to the guidelines page for Helwan University */}
        <Link to='/Guidelines_hu?universityName=حلوان'>
          <a href="/Guidelines_hu"><i className="fa-solid fa-info-circle"></i> إرشادات التقديم لجامعة حلوان</a>
        </Link>

        {/* Link to the guidelines page for Private Helwan University */}
        <Link to='/Guidelines_hu?universityName=حلوان الاهلية'>
          <a href="/Guidelines_hu"><i className="fa-solid fa-info-circle"></i> إرشادات التقديم لجامعة حلوان الأهلية</a>
        </Link>
      </div>

      <Outlet />
    </>
  );
}
