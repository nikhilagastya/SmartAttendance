import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { useState } from 'react';
import Query from './Query';
import Arten from './Arten';

function App() {
  const [data,setData] = useState("");
  const [status,setStatus] = useState(false);
  const [flag, setFlag] = useState(false);
  async function handleForm(e){
    e.preventDefault();
    const username = data;
    console.log("Student Name: " + data);
    const res = await fetch("/getData", {
      method: "POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        username
     })
    });
    
    if(res.status===200){
      setStatus(true);
      setFlag(true)
      console.log("Present!");
    }
    else{
      setStatus(false);
      console.log("Absent");
      
    }

    
}

function handleInputs(e){
  var name = e.target.name;
  var value = e.target.value;

  setData(value);
}
  return (
      <div class="d-flex justify-content-center ">
        
            <div class="card container loginDabba">
              <div class = "">
                <h4 className = "text-center  mt-4 authenticationText">ARTENDANCE</h4>
                <form className="form m-4">
                    <label for="Username">Netra ID</label>
                    <input name = "username" value = {data} className="form-control" placeholder="Enter Netra ID" onChange = {handleInputs} type="text" />
                </form>
                <form className = "form m-2 d-flex justify-content-center">
                <button type = "submit" onClick = {handleForm} className = "btn btn-sm btn-success">Get Attendance Status</button>
                </form>
                
                  {flag?(status?<Query props = "PRESENT"/>:<Query props = "ABSENT"/>):<Query props = ""/>}
              </div>
            </div>
    </div>
  );
}

export default App;
