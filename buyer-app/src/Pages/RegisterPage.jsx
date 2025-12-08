import React, { useState } from "react";
import "../App.css"

const RegisterPage = () => {
const[name,setname]=useState("");
const[email,setemail]=useState("");
const[password,setpassword]=useState("");
const[confirmpassword,setconfirmpassword]=useState("")

const handlesubmit = (e) =>{
    e.preventDefault();
    console.log(name, email, password, confirmpassword);
}

return(
<div className="register-wrapper">
    <div className="register-card">
<h1>Welcome! Start creating your account</h1>

<form className="register-form" onSubmit={handlesubmit}>
    <input 
     type="text"
     placeholder="Full Name" 
     value={name}
     onChange={(e) => setname(e.target.value)}
    />
    <input 
     type="email"
     placeholder="Email"
     value={email}
     onChange={(e) => setemail(e.target.value)}
    />
    <input 
     type="password" 
     placeholder="Password"
     value={password}
     onChange={(e) => setpassword(e.target.value)}
    />
    <input 
    type="password" 
    placeholder="Confirm Password"
    value={confirmpassword}
    onChange={(e) => setconfirmpassword(e.target.value)}
    />
    <button type="submit">Sign Up</button>
   </form>
  </div>
 </div>
)
}
export default RegisterPage;