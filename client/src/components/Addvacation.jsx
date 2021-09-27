import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch } from "react-redux"
import { setVacations } from "../redux/actions"
import formatDataForRedux from "../redux/format"


function parseJwt(token) {
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

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function Addvacation({ history }) {
  const dispatch = useDispatch()
  const classes = useStyles();
  const [place, setplace] = useState("");
  const [tripdescription, settripdescription] = useState("");
  const [price, setPrice] = useState();
  const [img, setImg] = useState("");
  const [fromdate, setfromdate] = useState();
  const [todate, setTodate] = useState();
  if (parseJwt(localStorage.isadmin).isadmin === 1) {
    return (
      <div className="addVacBody">
        <div className="addForm">
          <div>
            <TextField
              id="location"
              label="location"
              onChange={(e) => {
                setplace(e.target.value);
              }}
            />
          </div>
          <div>
            <TextField
              id="description"
              label="description"
              onChange={(e) => {
                settripdescription(e.target.value);
              }}
            />
          </div>
          <div>
            <TextField
              id="price"
              label="price"
              onChange={(e) => {
                setPrice(e.target.value);
              }}
            />
          </div>
          <div>
            <TextField
              id="imageUrl"
              label="imageUrl"
              onChange={(e) => {
                setImg(e.target.value);
              }}
            />
          </div>

          <TextField
            id="date"
            label="from date:"
            type="date"
            defaultValue="0000-00-00"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              setfromdate(e.target.value);
            }}
          />
          <TextField
            id="date"
            label="to date:"
            type="date"
            defaultValue="0000-00-00"
            className={classes.textField}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => {
              setTodate(e.target.value);
            }}
          />

          <br />
          <Button
            type={"submit"}
            variant="contained"
            color="primary"
            onClick={async (e) => {
              e.preventDefault();
              try {
                const res = await fetch("http://localhost:1000/addvacation", {
                  method: "post",
                  headers: { "content-type": "application/json" },
                  body: JSON.stringify({
                    tripdescription,
                    place,
                    fromdate,
                    todate,
                    price,
                    img,
                  }),
                });
                
                const data = await res.json();
                const newData =formatDataForRedux(data.some)
                    
                    dispatch(setVacations(newData))
                
                
              } catch (err) {
                console.log(err);
              }
            }}
          >
            Add Vacation
          </Button>
        </div>
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
      </div>
    );
  } else {
    history.push('/404')
    return (
      <div>
        
      </div>
    );
  }
}
