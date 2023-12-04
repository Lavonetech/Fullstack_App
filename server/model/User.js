const mongoose = require( "mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      
      required: true,
      min: 2,
      max: 100,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,

      required: true,
     
    },
    city: String,
    state: String,
    country: String,
    occupation: String,
    phoneNumber: String,
    
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "admin",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
module.exports= {User}