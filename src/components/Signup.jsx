import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {

  const [credentials, setCredentials] = useState({name: "", email: "", password: ""});
  let navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
        // API call
        const {name, email, password} = credentials;
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({name, email, password})
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            //Save authtoken and redirect
            localStorage.setItem('token', json.authtoken);
            navigate("/")
            props.showAlert(" Account created successfully!", "success")
        }
        else if(json.error === "This email already exists"){
            props.showAlert(" This email already exists!", "warning");
        }
        else{
          props.showAlert(" Something went wrong!", "danger");
        }
      }

      const onChange = (e) => {
        setCredentials({...credentials, [e.target.name] : e.target.value});
      }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="name" onChange={onChange} aria-describedby="emailHelp" minLength={3} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" name="password" onChange={onChange} id="password" minLength={5} required/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup