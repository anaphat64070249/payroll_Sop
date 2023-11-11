const pool = require("../config");

async function isLoggedIn(req,res,next) {
    let authorization = req.header.role;

    if (!role) {
        return res.status(401).send('You are not logged in')
    }

    if (authorization != "Supervisor" || authorization != "Manager" || authorization != "HR"){
        return res.status(401).send('You are not logged in')
    }
    else{
        next()
    }
}

module.exports = {isLoggedIn}