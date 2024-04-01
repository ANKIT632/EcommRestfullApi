const categoryModel=require('../models/category.model.js')

/* 
  controller for creating the category

  POST localhost:8080/ecomm/api/v1/category
*/

exports.createNewCategory= async(req,res)=>{ // name export

    //read the req body
    const {name,description}=req.body;

    // create the category object
    const cat_data={name,description};

    // insert into mongodb
    try{
     const category=await categoryModel.create(cat_data);

     return res.status(201).send(category);
    }

    catch(err){
  console.log("Error while creating the category",err);

    return res.status(500).send({message:"Error while creating the category"});
    }
    // return the response of the created category


}