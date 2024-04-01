const authController=require("../controllers/auth.controller.js");
const authMw=require("../middleware/auth.mw.js");


module.exports=(app)=>{
    
    app.post("/ecomm/api/v1/signup",authMw.verifySignUpBody,authController.signup);

     /* 
       POST localhost:8080/ecomm/api/v1/signin
     */
    app.post("/ecomm/api/v1/signin",authMw.verifySignInBody,authController.signin);
}

