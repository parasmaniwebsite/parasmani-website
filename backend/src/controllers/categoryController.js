import Category from "../models/Category.js";

// Create Category
export const createCategory = async (
  req,
  res
) => {
  try {

    const { name } = req.body;

    const exists =
      await Category.findOne({
        name,
      });

    if (exists) {
      return res.status(400).json({
        success:false,
        message:
        "Category already exists",
      });
    }

    const category =
      await Category.create({
        name,
      });

    res.status(201).json({
      success:true,
      category,
    });

  } catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }
};


// Get Categories
export const getCategories =
async(req,res)=>{

try{

const categories=
await Category.find().sort({
createdAt:-1
});

res.status(200).json({
success:true,
categories
});

}catch(error){

res.status(500).json({
success:false,
message:error.message
});

}

};


// Delete Category
export const deleteCategory =
async(req,res)=>{

try{

await Category.findByIdAndDelete(
req.params.id
);

res.status(200).json({
success:true,
message:"Deleted"
});

}catch(error){

res.status(500).json({
success:false,
message:error.message
});

}

};