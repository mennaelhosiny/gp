import axios from 'axios'
import { useFormik } from 'formik'
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FallingLines } from 'react-loader-spinner'
import { authContext } from '../../../context/authentication'
import logoImage from "../../../images/logo 3 copy.png"

export default function Home() {

  const handleLogout = () => {
    localStorage.removeItem('tkn');
  };
  const setToken =useContext(authContext)

   let user={
  
    userName:"",
    password:"",
  

   }

   const [errMsg,setErrMsg] =useState(null)
   const [successMsg,setSuccessMsg] =useState(null)
   const [isLouding,setisLouding] =useState(false)


  const navigate=useNavigate()

   async function LoginToAccount(value){
    setisLouding(true)

  //  const {data}=  await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup",value).catch( function(error){
  //   console.log("error occar",error)
  //   console.log(error.response.data.message)

  //  })
  //  console.log(data)

try{
    const {data}=  await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signin",value)
      console.log(data)
      if (data.message==="success"){
        localStorage.setItem('tkn',data.token)
        setToken(data.token)
        setSuccessMsg("Welcome back")
        setTimeout(function(){
          navigate('/Home')
        },1000)
      }
}
catch(err){
  console.log("error occur",err.response.data.message)
  setErrMsg(err.response.data.message)
}


setisLouding(false)

  }

  const formikObj=useFormik({
    initialValues:user,
    onSubmit:LoginToAccount,
    validate : function(value){

      setErrMsg(null)

    const error={}
    
    if (value.userName.includes(value.userName.length<4 || value.userName.length>10)){
      error.userName='userName Invalid'
    }

    if (value.password.length<6 || value.password.length>12){
      error.password="password must be at from 6 to 12 charcters"
    }
   
    return error
    }
  })
  return <>
  <nav className="navbar navbar-expand-lg navbar  bg main-bg-color">
<div className="container">
<ul className="navbar-nav me-auto mb-2 mb-lg-0   ">
  <li className="nav-item">
      <Link className="nav-link   " aria-current="page" to="/signin">  المدن الجامعيه بجامعة حلوان </Link>
    </li> 
    
  </ul>
<button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
  <span className="navbar-toggler-icon"></span>
</button>
<div className="collapse navbar-collapse " id="navbarSupportedContent">
 
  
</div>
<Link className='navbar-brands ' to='/'> 
<img src={logoImage} alt="" className='w-100 logo' />
</Link>

</div>
</nav>




  <div className="w-75 m-auto py-5">
    {errMsg?  <div className="alert alert-danger">{errMsg}</div> :"" }
    {successMsg? <div className="alert alert-success">{successMsg}</div> :"" }
    <h2 className='mb-5'>تسجيل الدخول  </h2>
    <form onSubmit={formikObj.handleSubmit}>

    <label htmlFor="userName" className='mb-2'>اسم المستخدم:</label>
    <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.userName} id='userName'className='form-control mb-3' type ="text" placeholder='اسم المستخدم' /> 
    {formikObj.errors.userName&& formikObj.touched.userName?    <div className="alert alert-danger">{formikObj.errors.userName}</div>:""}

    <label htmlFor="password" className='mb-2'>كلمة المرور:</label>
    <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.password} id='password'className='form-control mb-3' type="password" placeholder='كلمة السر' />
    {formikObj.errors.password&& formikObj.touched.password?    <div className="alert alert-danger">{formikObj.errors.password}</div>:""}

    <Link to='/ForgetPassword'className='black d-flex justify-content-end' >نسيت كلمة المرور؟ </Link>

    
    <button type='submit' disabled={ formikObj.isValid===false || formikObj.dirty===false}  className='btn main-bg-color white ms-auto d-block '>
      
   

      
      {isLouding? <FallingLines
          color="#fff"
          width="50"
          visible={true}
          ariaLabel='falling-lines-loading'
      />:"دخول"}
      
  
      </button>
      <Link to='/appointment' onClick={handleLogout} className=' black mt-2 d-flex justify-content-end '>تقدم الطلاب للمدن الجامعيه</Link>

    </form>
    </div>
  
  </>
}
