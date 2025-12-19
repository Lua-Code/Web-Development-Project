import React, { useState } from "react";
import "../App.css"

const RegisterPage = () => {
const[name,setname]=useState("");
const[email,setemail]=useState("");
const[password,setpassword]=useState("");
const[confirmpassword,setconfirmpassword]=useState("")

const handlesubmit = async (e) => {
  e.preventDefault();

  const res = await fetch("http://localhost:5000/api/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      email,
      password,
      confirmpassword
    })
  });

  const data = await res.json();
  console.log(data);
};


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