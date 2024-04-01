const auth_mw=require('../middleware/auth.mw.js')
/* 
POST localhost:8080/ecomm/api/v1/categoryes
*/


const category_controller=require("../controllers/category.controller.js");

//single export anonymous function
module.exports=(app)=>{  

 app.post('/ecomm/api/v1/categories',auth_mw.verifyToken,auth_mw.checkIsAdmin, category_controller.createNewCategory);

}



// note if define the multiple anonymous function then over write the previous function only call last one. 