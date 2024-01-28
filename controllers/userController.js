const asynchandler = require("express-async-handler")
const User = require("../models/userModels")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
//@desc register the user
//@route POST /api/users
//@access public

const registerUser = asynchandler(async (req, res) => {

    const { username, email, password } = req.body
    if (!username || !email || !password) {
        res.status(400)
        throw new Error("All fields are mandatory!")
    }
    const userAvailable = await User.findOne({ email })
    if (userAvailable) {
        res.status(400)
        throw new Error("User already registered!")
    }
    //Hash password
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log("Hashed Password: ", hashedPassword)
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    console.log(`User created ${user}`)
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email })
    }
    else{
        res.status(400)
        throw new Error("User data us not valid")
    }
    res.json({ message: "register the user" })
})

//@desc login the user
//@route POST /api/users
//@access public

const loginUser = asynchandler(async (req, res) => {

    const {email,password} = req.body
    if(!email || !password){
        res.status(400)
        throw new Error("All fields are mandotory")
    }
    const user = await User.findOne({email})
    //compare pass with hash pass
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            user:{
                username : user.username,
                email : user.email,
                id : user.id,
            },
        },
        process.env.ACCESS_TOKEN_SECRET,
        {expiresIn : "1m"}
        )
        res.status(200).json({accessToken})
    }
    else{
        res.status(401)
        throw new Error("email and password is not valid")
    }
})

//@desc current user information
//@route GET /api/users
//@access private

const currentUser = asynchandler(async (req, res) => {
    res.json({ message: "current user Information" })
})

module.exports = { registerUser, loginUser, currentUser }