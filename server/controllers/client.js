const Product = require("../model/Product");
const { User } = require("../model/User");
const getCountryIso3=require('country-iso-2-to-3');

const createProduct = async (req, res) => {
  const { name, price, description, category, rating, supply } = req.body;

  try {
    const product = new Product({
      name,
      price,
      description,
      category,
      rating,
      supply,
    });

    await product.save();

    res.status(201).json({ message: "Product created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

const createUser = async (req,res) => {
  const {
    name,
    email,
    password,
    city,
    country,
    state,
    occuption,
    phoneNumber,
    role,
  } = req.body;

  try {
    const user = new User({
      name,
      email,
      password,
      city,
      state,
      country,
      occuption,
      phoneNumber,
      role,
    });

    await user.save();
    console.log(user)

    res.status(201).json({ message: "User created successfuly" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const getUser=async (req,res)=>{

  try{

    const query=User.find();
    const user=await query.exec();

    if(!user || user.length===0){
      res.status(404).json({message:"User not found"})
    }
    res.status(200).json({user})
  }catch(err){
    console.log(err)
  }
}

const getGeography =async (req,res)=>{

  try{
  const users=await User.find();
  const mappedLocations =users.reduce((acc,{country})=>{

    const countryISO3=getCountryIso3(country);
    if(!acc[countryISO3]) {
      acc[countryISO3] =0
    }
    acc[countryISO3]++
    return acc

  },{})
   
  const  formattedLocation=Object.entries(mappedLocations).map(
    ([country,count])=>{
      return {id:country,value:count}
    }
  )

  res.status(200).json({formattedLocation});
  }catch(err){
    console.log(err)
    res.status({message:"Server error"})
  }

}
module.exports = {
  createProduct,
  createUser,
  getUser,
  getGeography
};
