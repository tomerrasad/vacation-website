import React from "react";
import { TextField, Button } from "@material-ui/core";


const  login = ({history}) => {
    
  

  const formOnSubmit = async (e) => {
    e.preventDefault();
    const [username, password] = e.target;
    try {
      const res = await fetch("http://localhost:1000/login", {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          username: username.value,
          password: password.value,
        }),
      });

      const data = await res.json();
      
      if (data.token) {
          
          
    
          
          localStorage.setItem("isadmin", `${data.token}`);
          if(res.status===200){
              history.push('/vacations')
          }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
      <div className="loginBody">
    <form onSubmit={formOnSubmit}>
      <div className="login-inputs">
        <div className="centerInBackground">
          <h2>Login</h2>
          <div>
            <div>
              <TextField id="username" label="Username" />
            </div>
            <div>
              <TextField type={"password"} id="password" label="Password" />
            </div>
          </div>
          <br />
          <Button type={"submit"} variant="contained" color="primary">
            Login
          </Button>
          
          

          <p>
            dont have an account yet ? <a href="/register">Register</a>
          </p>
        </div>
      </div>
    </form>
    </div>
  );
};



export default (login);
