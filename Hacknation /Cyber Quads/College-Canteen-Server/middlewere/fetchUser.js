const jwt = require('jsonwebtoken');

const fetchUser = (req, res, next) => {
    //Get the user from the jwt token and add ID to req object
    const token = req.header('authToken');
    if(token!=null){
        // console.log("token= "+token)
    }
    //if token == null, neeche wala if k andar ka code execute nahi ho raha hai
    if (!token) {
        res.status(401).send({ error: "No Token Please authenticate using a valid token" });
        return;
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.user;
        if(data.user==undefined){
            res.status(500).send("Internal server error");
            return;
        }
    } catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" });
        return;
    }
    next();
}


module.exports = fetchUser;
