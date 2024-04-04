const mongoose =require('mongoose');

const cartSchema=new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Product'
    }
    ,
    productCount:{
        type:Number,
        required:true,
    }
    ,
   createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true,
   }

});

module.exports=mongoose.model('Cart',cartSchema);