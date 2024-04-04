const controller=require('../controllers/cart.controller');
const  mw=require('../middleware/auth.mw.js');

module.exports=(app)=>{
    app.post('/ecomm/api/v1/cart/:productId',mw.verifyToken, mw.validateCart,controller.createNewCart);

    app.get('/ecomm/api/v1/cart/:userId',controller.getAllCart);
}