import mongoose from "mongoose";

const UserSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true,
            unique:true
        },
        password:{
            type:String,
            required:true
        },
        isAdmin: {
            type: Boolean,
            default: false
        },
        resetPasswordToken: {
            type: String,
        },
        resetPasswordExpires: {
            type: Date,
        },
        cart: [
            {
                _id: String,
                name: String,
                price: Number,
                image: String,
                quantity: Number,
                size: String,
                color: String,
                cartItemId: String,
            }
        ],
        wishlist: [
            {
                _id: String,
                name: String,
                price: Number,
                image: String,
                category: String,
                subcategory: String,
            }
        ]
    }
)
export default mongoose.models.User || mongoose.model("User", UserSchema);