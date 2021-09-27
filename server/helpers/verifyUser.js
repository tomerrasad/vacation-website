const jwt = require('jsonwebtoken')


function vu(req,res,next){
    console.log("token from mw:", req.headers.authorization)

    jwt.verify(req.headers.authorization,process.env.TOKEN_SECRET, (err, payload)=>{
        if(err){
            return res.status(401).send(err)
        }
        req.user = payload
        next()
    })
}

module.exports = vu