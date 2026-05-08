const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken')
const crypto = require('crypto');

async function signUp(req, res) {

    
    const { username, email, password, contact } = req.body;

    const isUserAlreadyExist = await userModel.findOne(
        {
            $or: [
                { username },
                { email }
            ]
        }
    )

    if (isUserAlreadyExist) {
        return res.status(409).json({ message: "User already exist" });
    }


    if (!password) {
        return res.status(400).json({ message: "Password is required" });
    }

    const hashedPassword = crypto.createHash("sha256").update(password).digest("hex")

    const user = await userModel.create({
        username,
        email,
        password: hashedPassword,
        contact,
        file: req.file.filename
    })

    const token = jwt.sign(
        {
            _id: user.id,
            username: user.username
        }, process.env.JWT_SECRET,
        {
            expiresIn: '1d'
        }
    )


    return res.status(201).json({
        message: "User signed Up Successfully",
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            contact: user.contact,
            file: user.file
        }
    })



}

async function logIn(req, res) {
    // console.log("BODY:", req.body);
    try {
        // const { email, password } = req.body;



        // const username=req.body.username;
        const email = req.body.email;
        const password = req.body.password;
        // console.log("Email:", email);
        // console.log("password:", password);

        const user = await userModel.findOne({ email })

        if (!user) {
            return res.status(404).json({
                message: "Invalid username or password"
            })
        }

        const hashedPassword = await crypto.createHash("sha256").update(password).digest("hex")

        const validPassword = hashedPassword == user.password;

        if (!validPassword) {
            return res.status(401).json({ message: "Not valid credentials" })
        }

        const token = jwt.sign(
            {
                _id: user.id,
                username: user.username
            }, process.env.JWT_SECRET,
            {
                expiresIn: '1d'
            }
        )


        return res.status(200).json({
            message: "User logged in Successfully",
            token,
            user: {
                id:user._id,
                username: user.username,
                email: user.email,
                contact: user.contact,
                file:user.file
            }
        })
    }
    catch (err) {
        console.log(err.message);
    }
}

async function logOut(req, res) {

    return res.status(200).json({
        message: "User Logged Out successfully",
    })


}



module.exports = {
    signUp,
    logIn,
    logOut
}