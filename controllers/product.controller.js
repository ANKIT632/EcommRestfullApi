const product_model=require('../models/product.model');

exports.addProduct=async(req,res)=>{
    // get product
    const {productName,price,description}=req.body;

    // add product 
    try{
        console.log("user : ",req.user);
    const product=await product_model.create({productName,price,description,createdBy:req.user._id});

    return res.status(201).send(product);
    }
    catch(err){
        console.log("Error while creating the product",err);
        return res.status(500).send({message:"Error while creating the product"});
    }


}
exports.getProduct=async(req,res,next)=>{

    try{
        const getAllProduct=await product_model.find({}).populate('createdBy',"-password");

        if(getAllProduct.length>0){
           return res.status(200).send({product_data:getAllProduct});
        }
        else{
            return res.status(200).send({product_data:"Not any product available !!"}); 
        }

    }
    catch(err){
        return res.status(500).send({message:"Failed ! while get data"}); 
    }

}