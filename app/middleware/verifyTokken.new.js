const jwt = require(jsonWebToken);

const secretKey = "#RoadsterLife"

const jwtExceptions = ['/login', '/register']

const verifyToken = (req, res, next) => {

    if(jwtExceptions.includes(req.path)){
        next();
    }

const token = req.headers['authorization'];

if(!token){
return res.status(400).json("No Token Provided")
}

try {
    
const decoded = jwt.verify(token, secretKey)
req.user = decoded;
next();

} catch (error) {

  res.status(500).json("Something went Wrong", +error.message)
    
}

}

module.exports = verifyToken
