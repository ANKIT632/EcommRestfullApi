const user_model = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const { sercetKey } = require('../config/auth.config.js')

const verifySignUpBody = async (req, res, next) => {
  const { name, userId, email, password } = req.body;
  try {
    if (!name) {
      return res.status(500).send({ message: "Failed ! Name is not provide" });
    }

    if (!userId) {
      return res.status(500).send({ message: "Failed ! userId is not provide" });
    }

    if (!email) {
      return res.status(500).send({ message: "Failed ! email is not provide" });
    }

    if (!password) {
      return res.status(500).send({ message: "Failed ! password is not provide" });
    }

    const user = await user_model.find({ userId: userId });

    if (user?.length) {
      return res.status(500).send({ message: "Failed ! userId is already present try again" });
    }

    next();

  }
  catch (error) {
    console.log("Error while validation the req body in mw", error);
    return res.status(500).send({ message: "Error while validating the request" });
  }
}

const verifySignInBody = async (req, res, next) => {
  const { userId, password } = req.body;

  if (!userId) {
    return res.status(400).send({ message: "userId is not provided" });
  }

  if (!password) {
    return res.status(400).send({ message: "password is not provided" });
  }
  next();

}

const verifyToken = (req, res, next) => {

  const token = req.headers['access-token'];
 
  // check token is present or not. 
  if (!token) {
    return res.status(403).send({
      message: "No token found : unAuthorized"
    }); 
  }

  //if it's valid or not.
  jwt.verify(token, sercetKey, async (err, payload) => {
    if (err) {
      return res.status(401).send({
        message: 'Unauthorized user !'
      })
    }

    const user = await user_model.findOne({ userId: payload.id });

    if (!user) {
      return res.status(400).send({
        message: "UnAuthorized, this user for this token does't exist"
      });
    }

    // set the user in the req object.

    req.user = user;

    next();

  });



}


// validate product data.
const validateProduct=(req,res,next)=>{
  const {productName,price,description}=req.body;

  if(!productName || !price || !description){
    return res.status(400).send("failed ! all field mendotory ")
  }
  next();
}


// check for only add item admin.
const checkIsAdmin=(req,res,next)=>{
  const user=req.user;

  if(user && user.userType==="ADMIN"){
    next();
  }

  else{
    return res.status(403).send({
      message:"Only admin user are allow to access this end point"
    });
  
  }
}


const validateCart=(req,res,next)=>{
  
    if(req.productCount===0){
      return res.status(200).send({mess:"Cart count is empty"});
    }

    next();
}




module.exports = {
  verifySignUpBody,
  verifySignInBody,
  verifyToken,
  checkIsAdmin,
  validateProduct,
  validateCart,
}



/*
pass header from front end

fetch('http://your-api-url/endpoint', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'access-token': 'your_token_here'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
*/