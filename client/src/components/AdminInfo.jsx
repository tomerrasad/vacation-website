import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Bar } from "react-chartjs-2";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function AdminInfo({history}) {
  const classes = useStyles();

  const dataRedux = useSelector(
    (state) => state.vacations.vacations?.allVacations
  );
  // const labelsRedux = useSelector(
  //   (state) => state.vacations.vacations?.allVacations
  // );
   
    
  
  const [data, setdata] = useState();
  const [labels, setlabels] = useState();

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
    if (dataRedux) {
      
    
    
    setdata(dataRedux.filter((v) => v.followers > 0).map((v) => v.followers));
    setlabels(dataRedux.filter((v) => v.followers > 0).map((v) => v.place));
}
    
  }, [dataRedux]);
  if (parseJwt(localStorage.isadmin).isadmin=== 1) {
    
  return (
    <div>
      <div className="backToHome">
        <Button
          variant="contained"
          color="secondary"
          className={classes.button}
          onClick={() => {
            history.push("/vacations");
          }}
        >
          Back to Home
        </Button>
      </div>
      <Bar
        data={{
          labels: labels,
          datasets: [
            {
              label: "number of likes",
              data: data,
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                "rgba(255, 206, 86, 0.2)",
                "rgba(75, 192, 192, 0.2)",
                "rgba(153, 102, 255, 0.2)",
                "rgba(255, 159, 64, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                "rgba(255, 206, 86, 1)",
                "rgba(75, 192, 192, 1)",
                "rgba(153, 102, 255, 1)",
                "rgba(255, 159, 64, 1)",
              ],
              borderWidth: 1,
            },
          ],
        }}
        //width={340}
        //height={170}
        responsive={true}
        options={{
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
}else{
  history.push('/404')
  return(
    <div></div>
  );
}}
