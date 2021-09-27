
import React, { useState } from 'react';
import moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useDispatch } from "react-redux"
import { setVacations } from "../redux/actions"
import formatDataForRedux from "../redux/format"


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


export default function Editvacation({getData,edit,setedit,fetchVacationsData}) {

  const dispatch = useDispatch()
  const [place, setplace] = useState(getData.place);
  const [tripdescription, settripdescription] = useState(getData.tripdescription);
  const [price, setPrice] = useState(getData.price);
  const [img, setImg] = useState(getData.img);
  const [fromdate, setfromdate] = useState(getData.fromdate);
  const [todate, setTodate] = useState(getData.todate);
  const id = getData.id
  
    const classes = useStyles();
    return (
        <div className={` ${edit ? "seen":"notSeen"}`}>
            <button type="button" className="btn-close" aria-label="Close" onClick={()=>{
                setedit(!edit)

            }}></button>
            <TextField label="price" defaultValue={getData.price+'$'} onChange={(e) => {
                setPrice(e.target.value);
              }} />
            <TextField  label="description" defaultValue={getData.tripdescription} onChange={(e) => {
                settripdescription(e.target.value);
              }} />
            <TextField  label="location" defaultValue={getData.place} onChange={(e)=>{
                setplace(e.target.value);
              }}/>
            <TextField label="image" defaultValue={getData.img} onChange={(e) => {
                setImg(e.target.value);
              }}/>
            <TextField
        id="date"
        label="start date"
        onChange={(e) => {
            setfromdate(e.target.value);
          }}
        type="date"
        defaultValue={moment(getData.fromdate).format("YYYY-MM-DD")}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="date"
        label="end date"
        onChange={(e) => {
            setTodate(e.target.value);
          }}
        type="date"
        defaultValue={`${moment(getData.todate).format("YYYY-MM-DD")}`}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button variant="contained" onClick={async()=>{
          
          try {
            const res = await fetch("http://localhost:1000/editvacation", {
              method: "put",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({
                id,
                tripdescription,
                place,
                fromdate,
                todate,
                price,
                img
                
              }),
            });
            
            const data = await res.json();
            
            const newData =formatDataForRedux(data.some)
                    
                    dispatch(setVacations(newData))
            setedit(!edit)
        } catch (err) {
            console.log(err);
        }
          }}>Update</Button>
           
            
            
        </div>
    )
}
