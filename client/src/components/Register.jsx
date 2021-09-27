import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { Link } from "react-router-dom";



export default function Register({ history }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
    const[data,setData] = useState("")

  

  return (
      <div className="registerBody">
    <div className="register-inputs">
      <div className="centerInRegister">
        <form>
          <div>
            <div>
              <h2>Register</h2>
              <div>
                <div>
                  <TextField
                    id="username"
                    label="Username"
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <TextField
                    type="password"
                    id="password"
                    label="Password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <TextField
                    id="firstname"
                    label="firstname"
                    onChange={(e) => {
                      setFname(e.target.value);
                    }}
                  />
                </div>
                <div>
                  <TextField
                    id="lastname"
                    label="lastname"
                    onChange={(e) => {
                      setLname(e.target.value);
                    }}
                  />
                </div>
              </div>
              <br />
              <Button
                type={"submit"}
                variant="contained"
                color="primary"
                onClick={async (e) => {
                    e.preventDefault()
                  try {
                    const res = await fetch("http://localhost:1000/register", {
                      method: "post",
                      headers: { "content-type": "application/json" },
                      body: JSON.stringify({
                        username,
                        password,
                        fname,
                        lname,
                      }),
                    });
                    
                    const data = await res.json();
                    
                    setData(data.some)
                    
                    if (res.status===200) {
                      history.push("/login");
                    }
                  } catch (err) {
                    console.log(err);
                  }
                }}
              >
                Register
              </Button>
                    <p>{data}</p>
              <p>
                already have an account? <Link to={"/login"}>Login</Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
}

  
  