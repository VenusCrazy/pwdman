const User = require('../models/user')
const {hashPassword, comparePasswords} =require('../helpers/auth')
const jwt = require('jsonwebtoken')
const {signAcessToken} = require('../helpers/tokenUtils')

const test = (req,res)=>{
    res.json('test is working')
}

//signupendpoint
const signupUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name) {
            return res.status(400).json({ error: 'Name is required' });
        }

        if (!password || password.length < 6) {
            return res.status(400).json({
                error: 'Password is required and it should be at least 6 characters long'
            });
        }

        const exist = await User.findOne({ email });
        if (exist) {
            return res.status(400).json({ error: 'Email is taken already' });
        }

        const hashedPassword = await hashPassword(password)
        const user = await User.create({
             name,
             email: email.toLowerCase().trim(),
             passwordHash : hashedPassword,
            });

        return res.status(201).json({
            id: user._id,
            name: user.name,
            email: user.email
        });
    } catch (error) {
        console.log('error', error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
//login endpoint
const loginUser = async (req,res) => {
    try {
        const {email, password}=req.body

        //Check if user exists
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({
                error:'No user found'
            })
        }

        //Check if passwords match
        const match = await comparePasswords(password,user.password)
        if(!match){
            return res.status(401).json({
                error:'Invalid email or password'
            })
        }

        const token = await jwt.sign(
            {email: user.email, id: user._id, name: user.name},
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        return res
            .cookie('token', token, { httpOnly: true, sameSite: 'lax' })
            .status(200)
            .json({
                id: user._id,
                name: user.name,
                email: user.email
            })
    } catch (error) {
        console.log('error', error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports ={
    test,
    signupUser,
    loginUser,
}