import React from 'react'
import { Link } from 'react-router-dom'
import logoImage from "../../../images/logo 3 copy.png"

export default function Navbar() {
  return <>
  <nav className="navbar navbar-expand-lg navbar main-bg-color bg-main-bg-color ">
<div className="container">

<button className="navbar-toggler gold" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
  <span className="navbar-toggler-icon  "></span>
</button>
<div className="collapse navbar-collapse gold " id="navbarSupportedContent">
  <ul className="navbar-nav ms-auto mb-2 mb-lg-0   ">
  <li className="nav-item">
      <Link className="nav-link  " to="/appointment"> مواعيد التقدم</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link " to="/JoinRequest">تقديم طلب الالتحاق </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link " to="/signin">تسجيل الدخول </Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link " aria-current="page" to="/enquiry"> الاستعلام عن القبول</Link>
    </li>
  <li className="nav-item">
      <Link className="nav-link " aria-current="page" to="/instruction">  الارشادات </Link>
    </li> 
    <li className="nav-item">
      <Link className="nav-link " aria-current="page" to="/adduser">  اضافه مستخدم</Link>
    </li> 
   
  
    <li className="nav-item">
      <Link className="nav-link " aria-current="page" to="/manage">    مستخدم</Link>
    </li> 
    <li className="nav-item">
      <Link className="nav-link " aria-current="page" to="/requests">    قبول الطلبات</Link>
    </li> 
    <li className="nav-item">
      <Link className="nav-link " aria-current="page" to="/Appointment_hu"> اضافه مواعيد</Link>
    </li> 
    <li className="nav-item">
      <Link className="nav-link " aria-current="page" to="/Penalty"> الجزاءات</Link>
    </li> 
    <li className="nav-item">
      <Link className="nav-link " aria-current="page" to="/managepenalty"> الجزاءات</Link>
    </li> 
    <li className="nav-item">
      <Link className="nav-link " aria-current="page" to="/Guidelines_hu"> اداره الارشادات</Link>
    </li> 
    <li className="nav-item">
      <Link className="nav-link " aria-current="page" to="/housing"> التسكين </Link>
    </li> 
    <li className="nav-item">
      <Link className="nav-link " aria-current="page" to="/building"> المباني</Link>
    </li> 
    <li className="nav-item">
      <Link className="nav-link " aria-current="page" to="/chatbot"> chatbot</Link>
    </li> 
  


   
    
   
  
   
    
  </ul>
 

  
 

  
</div>
<Link className='navbar-brands ' to='/'> 
<img src={logoImage} alt="" className='w-100 logo' />
</Link>
</div>
</nav>
  </>
}
