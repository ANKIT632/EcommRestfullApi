const product_model = require('../models/product.model');
const cart_model = require('../models/cart.model');


exports.createNewCart = async (req, res) => {


    // get cart value
    const productId = req.params.productId;
    console.log(productId);
    const { productCount } = req.body;

    // check product present or not
    try {
        const product = await product_model.findOne({ _id: productId });

        if (!product) {
            return res.status(500).send({ message: "wrong product id product not found" });
        }
        else {
            // add the cart

            if (!await cart_model.findOne({ productId })) {

                const cart = await cart_model.create({ productId, productCount, createdBy: req.user._id });
                return res.status(200).send(cart);
            }
            else {
                const updateCart = await cart_model.findOneAndUpdate({ productId }, { $inc: { productCount: productCount } });

                return res.status(200).send(updateCart);
            }

           

        }


    }
    catch (err) {
        console.log("Error occur while cart is create", err);
        return res.status(402).send({ mess: "Error occur while cart is create" })
    }




}