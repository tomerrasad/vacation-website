import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Editvacation from "./Editvacation";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from '@material-ui/core/Button';
import moment from 'moment';
import { useDispatch } from "react-redux"
import { setVacations } from "../redux/actions"
import formatDataForRedux from "../redux/format"


const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "30.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
}));

export default function VacationItem({getData,fetchVacationsData,isfollowed}) {

  const dispatch = useDispatch()
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false)
  const [isActive, setActive] = useState(isfollowed)
  const [edit, setEdit] = useState(false)
  const [vacation,setvacation]=useState(getData)
  const [data, setdata] = useState()

  let userId = parseJwt(localStorage.isadmin).id
  let vacationId = vacation.id

  const handleExpandClick = () => {
    setExpanded(!expanded)
  };
  
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

  const toggleClass = () => {
    setActive(!isActive);
  };

  if (parseJwt(localStorage.isadmin).isadmin === 1) {
    return (
      <div className='card'>
    <Card className={`${classes.root}`}>
    <CardMedia className={classes.media} image={getData.img} />
      <CardHeader
        title={getData.place}
        subheader={`from ${moment(getData.fromdate).format("DD-MM-YYYY")}`}
      />
      <CardHeader subheader={`to ${moment(getData.todate).format("DD-MM-YYYY")}`} />
      
      <CardContent>
        <Typography variant="body2" color="textSecondary" className="description" component="p">
          {getData.tripdescription}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
          <Editvacation getData={vacation} setedit={setEdit} edit={edit} fetchVacationsData={fetchVacationsData} />


        <Button type={"submit"} variant="contained" onClick={async () => {
          
          
                  try {
                    const res = await fetch("http://localhost:1000/removevacation", {
                      method: "delete",
                      headers: { "content-type": "application/json" },
                      body: JSON.stringify({
                        vacationId
                        
                      }),
                    });
                    
                    const data = await res.json();
                    setdata(data)
                    
                    const newData =formatDataForRedux(data)
                    
                    dispatch(setVacations(newData))
                    
                  } catch (err) {
                    console.log(err);
                  }
                  
                }}>Delete</Button>
        <Button variant="contained" color="secondary" onClick={()=>{
          setEdit(!edit)}
        } >
        Edit
      </Button>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{`price:${getData.price}$`}</Typography>
        </CardContent>
      </Collapse>
    </Card>
    </div>
  );
  }
  else{
  return (
      <div className='card'>
    <Card className={`${classes.root}`}>
    <CardMedia className={classes.media} image={getData.img} />
      <CardHeader
        title={getData.place}
        subheader={`from ${moment(getData.fromdate).format("DD-MM-YYYY")}`}
      />
      <CardHeader subheader={`to ${moment(getData.todate).format("DD-MM-YYYY")}`} />
      
      <CardContent>
        <Typography variant="body2" color="textSecondary" className="description" component="p">
          {getData.tripdescription}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          aria-label="add to favorites"
          onClick={async () => {
            toggleClass();
            if (isActive === true) {
              try {
                const res = await fetch("http://localhost:1000/unfollow", {
                  method: "delete",
                  headers: { "content-type": "application/json" },
                  body: JSON.stringify({ vacationId, userId }),
                });

                const data = await res.json();
                const newData =formatDataForRedux(data)
                   
                    dispatch(setVacations(newData))
                
              } catch (err) {
                console.log(err);
              }
            }
            else{
            try {
              const res = await fetch("http://localhost:1000/follow", {
                method: "post",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ vacationId, userId }),
              });

              const data = await res.json();
              
              const newData =formatDataForRedux(data)
                    
                    dispatch(setVacations(newData))
              
            } catch (err) {
              console.log(err);
            }}
            
          }}
        >
          <FavoriteIcon className={` ${isActive ? "likebtn" : ""}`}/>
        </IconButton>
        
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{`price:${getData.price}$`}</Typography>
        </CardContent>
      </Collapse>
    </Card>
    </div>
  );
}}
