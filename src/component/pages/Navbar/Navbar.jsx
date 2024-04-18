import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logoImage from "../../../images/logo 3 copy.png";

export default function Navbar() {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    // Check local storage for token and role
    const storedToken = localStorage.getItem("tkn");
    const storedRole = localStorage.getItem("role");

    if (storedToken !== null) {
      setToken(storedToken);
    }

    if (storedRole !== null) {
      setRole(storedRole);
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar main-bg-color bg-main-bg-color">
      <div className="container">
        <button className="navbar-toggler gold" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse gold" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {/* Conditionally render links based on token and user role */}
            {token !== null && role !== null && role === '0' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/EditJoinRequest">تعديل طلب الالتحاق</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/appointment">مواعيد التقدم</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/JoinRequest">تقديم طلب الالتحاق</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signin">تسجيل الخروج</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/enquiry">الاستعلام عن القبول</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/instruction">الارشادات</Link>
                </li> 
              </>
            )}
            {token !== null && role !== null && role === '1' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/adduser">اضافه مستخدم</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/manage">مستخدم</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/requests">قبول الطلبات</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Appointment_hu">اضافه مواعيد</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Penalty">الجزاءات</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/managepenalty">اداره الجزاءات</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/Guidelines_hu">اداره الارشادات</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/housing">التسكين</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/building">المباني</Link>
                </li>
              </>
            )}
            {!token && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/appointment">مواعيد التقدم</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/JoinRequest">تقديم طلب الالتحاق</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/signin">تسجيل الدخول</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/enquiry">الاستعلام عن القبول</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/instruction">الارشادات</Link>
                </li>
              </>
            )}
            {/* Role 2 links */}
            {token !== null && role !== null && role === '2' && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/EditJoinRequest">تعديل طلب الالتحاق</Link>
                </li>
              </>
            )}
          </ul>
          <Link className='navbar-brands' to='/'>
            <img src={logoImage} alt="" className='w-100 logo' />
          </Link>
        </div>
      </div>
    </nav>
  );
}
