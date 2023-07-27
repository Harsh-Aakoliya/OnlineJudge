import { useState } from "react";
import axios from "axios";
export const Auth=()=>{
    return <div className="auth">
        <Login />
        <Register />
    </div>
};




const Login=()=>{

    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")

   return <Form username={username} setUsername={setUsername} label="Login"/>
    
}

const Register=()=>{

    const [username,setUsername]=useState("")
    const [password,setPassword]=useState("")


    const onSubmit=async(event)=>{
    
        event.preventDefault();//it will not refresh page on submit

        //we are sending GET request to backend
        try{
            //making post request for given url and also passing parameter on which we need to do authentication
            await axios.post("http://localhost:3001/auth/register", {username,password});

            //now after request if there is no err then we need to alert so that we came to know that registration is done
            alert("Registration Done Now you can login");
        } catch(err){
             console.error(err);
            // console.log("a;slkdjf")
        }

    };
   return <Form username={username} setUsername={setUsername} setPassword={setPassword} label="Register" onSubmit={onSubmit}/>
    
}

const Form=({username,setUsername,password,setPassword,label,onSubmit})=>{
    return <div className="auth-container">
        <form onSubmit={onSubmit}>
            <h2>
                {label}
            </h2>
            <div className="form-group">
                <label htmlFor="username"> Username:</label>
                <input type="text" id="username" value={username} onChange={(event)=>setUsername(event.target.value)}/>
            </div>

            <div className="form-group">
                <label htmlFor="password"> password:</label>
                <input type="password" id="password" value={password} onChange={(event)=>setPassword(event.target.value)}/>
            </div>
 
            <button type="submit">{label}</button>

        </form>
    </div>
}
