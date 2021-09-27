import React from "react";
import VacationList from "./VacationList";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Home({history,fetchVacationsData}) {
  const classes = useStyles();

  function parseJwt(token) {
    if (token!=undefined) {
      
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
      }
  }
  
  if (parseJwt(localStorage.isadmin)!=undefined) {
    if (parseJwt(localStorage.isadmin).isadmin == "1") {
    return(
      <div className="vacationsBody">
      <div className="navbar">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              FlightX
            </Typography>
            <Button color="inherit" onClick={()=>{
              history.push('/addvacation')
            }}>+Add Vacation</Button>
            <Button color="inherit" onClick={()=>{
              history.push('/admin')
            }}>Admin Page</Button>
            <Button color="inherit" onClick={()=>{
              localStorage.removeItem("isadmin")
              history.push('/login')
            }}>Logout</Button>
          </Toolbar>
        </AppBar>
      </div>
      <div className="vacationList">
        <VacationList fetchVacationsData={fetchVacationsData} />
      </div>
    </div>
    )
          }
  else{
  return (
    <div className="vacationsBody">
      <div className="navbar">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              FlightX
            </Typography>
            <Button color="inherit" onClick={()=>{
              localStorage.removeItem("isadmin")
              history.push('/login')
            }}>Logout</Button>
          </Toolbar>
        </AppBar>
      </div>
      <div className="vacationList">
        <VacationList fetchVacationsData={fetchVacationsData}/>
      </div>
    </div>
  );}}
  // else{
  //   return(
  //     <VacationList fetch={fetchVacationsData} token={token}/>
  //   )
  // }
}
