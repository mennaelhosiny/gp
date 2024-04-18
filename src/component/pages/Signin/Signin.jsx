import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState,useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FallingLines } from 'react-loader-spinner'
import logoImage from "../../../images/logo 3 copy.png"


export default function Signin() {
  const[token,setToken] = useState(null)
  useEffect(function(){
  if(localStorage.getItem("tkn")!==null){
     setToken(localStorage.getItem("tkn"))
  }
  },[])

  const[role,setRole] = useState(null)
   useEffect(function(){
    if(localStorage.getItem("role")!==null){
      setRole(localStorage.getItem("role"))
    }
    },[]) 

        let user={
        nationalId:"",
        password:"",
      }

   const [errMsg,setErrMsg] =useState(null)
   const [successMsg,setSuccessMsg] =useState(null)
   const [isLouding,setisLouding] =useState(false)


  const navigate=useNavigate()

   async function LoginToAccount(value){
    setisLouding(true)
    console.log("sending to backend")
try{
    const {data}=  await axios.post("http://localhost:5000/api/login",{
      national_id:value.nationalId,
      password:value.password
  })
      console.log(data)
      if (data.message==="Successful login"){
        localStorage.setItem('tkn',data.token)
        localStorage.setItem('role',data.user.role)
        setToken(data.token)
        setRole(data.user.role)
        setSuccessMsg("Welcome back")
        setTimeout(function(){
          navigate('/EditJoinRequest')
        },1000)
      }
}
catch(err){
  console.log("error occur",err.message)
  setErrMsg(err.message)
}
const[formData,setFormData]=useState({
  nationalId:'',
  passw0rd:'',
})
const handleChangNationality = (event) => {
  setFormData({
    ...formData,
    [event.target.id]: event.target.value,
  });
};

setisLouding(false)
handleChangNationality()
  }

  const formikObj=useFormik({
    initialValues:user,
    onSubmit:LoginToAccount,
    validate : function(value){
      
      setErrMsg(null)

    const error={}
    
    if (value.nationalId.includes(value.nationalId.length<13 && value.nationalId.length>13)){
      error.nationalId='nationalId Invalid'
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
    <h3 className='mb-5'>تسجيل الدخول  </h3>
    <form onSubmit={formikObj.handleSubmit}>

    <label htmlFor="nationalId" className='mb-2' > الرقم القومي:</label>
    <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.nationalId} id='nationalId'className='form-control mb-3' type ="text" placeholder='الرقم القومي' /> 
    {formikObj.errors.nationalId&& formikObj.touched.nationalId?    <div className="alert alert-danger">{formikObj.errors.nationalId}</div>:""}

    <label htmlFor="password" className='mb-2'>كلمة المرور:</label>
    <input onBlur={formikObj.handleBlur} onChange={formikObj.handleChange} value={formikObj.values.password} id='password'className='form-control mb-3' type="password" placeholder='كلمة المرور' />
    {formikObj.errors.password&& formikObj.touched.password?    <div className="alert alert-danger">{formikObj.errors.password}</div>:""}

    <Link to='/ForgetPassword'className='black d-flex justify-content-end' >نسيت كلمة المرور؟ </Link>

    
    <button type='submit' disabled={ formikObj.isValid===false || formikObj.dirty===false}  className='btn main-bg-color white ms-auto d-block'>
      
   
     
      
      {isLouding? <FallingLines
          color="#fff"
          width="50"
          visible={true}
          ariaLabel='falling-lines-loading'
      />:"دخول"}
      
  
      </button>

    </form>
    </div>
  
  </>
}

