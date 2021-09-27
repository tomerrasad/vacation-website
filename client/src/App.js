import React, { useEffect, useState } from "react"
import Login from "./components/Login"
import { BrowserRouter as Router, Redirect, Route, Switch } from "react-router-dom"
import Register from "./components/Register"
import Home from "./components/Home"
import AdminInfo from "./components/AdminInfo"
import Addvacation from "./components/Addvacation"
import Page404 from "./components/Page404"
import { useDispatch,useSelector } from "react-redux"
import { setVacations } from "./redux/actions"
import formatDataForRedux from "./redux/format"


export default function App () {

  function parseJwt(token) {
    if (token!=undefined) {
    const base64Url = token.split(".")[1]
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
        })
        .join("")
    );
    return JSON.parse(jsonPayload);
      }
  }

  const [token, settoken] = useState(parseJwt(localStorage.isadmin))
  
  const dispatch = useDispatch()
  
  const fetchVacationsData = async () => {
    try {
      
      const res = await fetch(`http://localhost:1000/vacations/${token.id}`, {
        method: "get",
        headers: { authorization: localStorage.isadmin },
      });

      const data = await res.json();
      
      
      dispatch(setVacations(formatDataForRedux(data)))

    } catch (err) {
      console.log(err);
    }
  }
  
  useEffect(() => {
    
      fetchVacationsData()
    

    
  }, [])

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login" component={ Login } />
          <Route path="/register" component={ Register } />
          <Route path="/vacations" component={ Home } fetchVacationsData={fetchVacationsData}/>
          <Route path="/admin" component={ AdminInfo } />
          <Route path="/addvacation" component={ Addvacation } />
          <Route path="/404" component={ Page404 } />
          
          

          <Redirect exact from="/" to="/login" />
        </Switch>
      </div>
    </Router>
  )
}
