import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import VacationItem from "./VacationItem";
import { useHistory } from "react-router-dom";

export default function VacationList({ fetchVacationsData }) {
  let history = useHistory();
  
  const data = useSelector((state) => state.vacations.vacations);
  const state = useSelector((state) => state);

  function parseJwt(token) {
    if (token != undefined) {
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
  useEffect(() => {
    
    if (!parseJwt(localStorage.isadmin)) {
      history.push('/login')
      
    }
  

  
}, [])

  
  return (
    <div className="container">
      {data?.followedVacations?.map((vacation) => (
        <VacationItem
          key={vacation.id}
          getData={vacation}
          fetchVacationsData={fetchVacationsData}
          isfollowed={true}
        />
      ))}
      {data?.unFollowedVacations?.map((vacation) => (
        <VacationItem
          key={vacation.id}
          getData={vacation}
          fetchVacationsData={fetchVacationsData}
          isfollowed={false}
        />
      ))}
    </div>
  );
}
