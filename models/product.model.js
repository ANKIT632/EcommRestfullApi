const mongoose=require('mongoose');
const crypto = require('crypto');

const productSchema=mongoose.Schema({

    productName:{
        type:String,
        required:true,
    },
    productId:{
        type: String,
        unique: true,
        default: function generateUniqueString() {
          let id;
          do {
            id = crypto.randomBytes(5).toString('hex');
          } while ( this.model('Product').countDocuments({ productId: id }) > 0);
          return id;
        },
        required:true
    },
   
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true,
    }
    ,
   createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required:true,
  }

},{timestamps:true,});

module.exports=mongoose.model("Product",productSchema);