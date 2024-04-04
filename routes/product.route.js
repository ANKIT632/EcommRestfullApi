const productController = require('../controllers/product.controller');
const auth_mw = require('../middleware/auth.mw');
module.exports=(app)=>{
app.post('/ecomm/api/v1/products',auth_mw.verifyToken,productController.addProduct);

app.get("/ecomm/api/v1/products",productController.getProduct);
}