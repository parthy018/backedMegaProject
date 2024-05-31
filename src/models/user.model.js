import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true,     // used to enable searching in database 
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,

    },
    fullName: {
        type: String,
        required: true,
        trim: true,
        index: true,
    },
    avatar: {
        type: String,        // cloudnary url
        required: true,
    },
    avatar: {
        type: String,        // cloudnary url
    },
    watchHistory: [
        {
            type: Schema.Types.ObjectId,
            ref: "Video"
        }
    ],
    password: {          // one challenge is that password should be hashed to ham yada hashed pass
        // and not plain text so how we match user password with hashed password
        type: String,
        required: [true, "Please provide a password"],
    },
    refreshToken: {
        type: String,
    },

}, {
    timestamps: true
});

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = bcrypt.hash(this.password, 10);
    next();
});


userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
            _id: this._id,
            username: this.username,
            email: this.email,
            fullName: this.fullName,
    }, process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn:process.env.ACCESS_TOKEN_EXPIRY,
    });
}

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
            _id: this._id,
            
    }, process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY,
    });
}

// comparing plain text password with hashed password
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}



export const User = mongoose.model("User", userSchema);

