const mysql = require('mysql')

const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"vacations",
})

con.connect(err=>{
    if (err) {
        console.log(err)
    }else{
        console.log("connected to mySql")
    }
})

const execute = sql =>{
    return new Promise((resolve, reject)=>{
        con.query(sql, (err, result)=>{
            if(err){ 
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}

module.exports={execute}