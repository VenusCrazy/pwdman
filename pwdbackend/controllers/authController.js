const User = require('../models/user')
const jwt = require('jsonwebtoken')
const {hashPassword, comparePasswords} =require('../helpers/auth')
const {signAccessToken, signRefreshToken} = require('../helpers/tokenUtils')

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

        const exist = await User.findOne({ email: email.toLowerCase().trim() });
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
        const user = await User.findOne({email: email.toLowerCase().trim()})
        if(!user){
            return res.status(404).json({
                error:'No user found'
            })
        }

        //Check if passwords match
        const match = await comparePasswords(password,user.passwordHash)
        if(!match){
            return res.status(401).json({
                error:'Invalid email or password'
            })
        }

        const accessToken = signAccessToken(user)
        const refreshToken = signRefreshToken(user)

        return res
            .cookie('refreshToken', refreshToken, {
                httpOnly: true,
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            .status(200)
            .json({
                user: { id: user._id, name: user.name, email: user.email },
                accessToken
            })
    } catch (error) {
        console.log('error', error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

const meHandler = async (req, res) => {
    const user = await User.findById(req.user.id)
    if (!user) return res.status(401).json({ error: 'User no longer exists' })
    res.json({ id: user._id, name: user.name, email: user.email })
}

const refreshUser = async (req, res) => {
    const { refreshToken } = req.cookies
    if (!refreshToken) return res.status(401).json({ error: 'No refresh token' })

    jwt.verify(refreshToken, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) return res.status(401).json({ error: 'Invalid refresh token' })
        const user = await User.findById(decoded.id)
        if (!user || user.refreshTokenVersion !== decoded.ver) {
            return res.status(401).json({ error: 'Session revoked' })
        }
        res.json({ accessToken: signAccessToken(user) })
    })
}

const logoutUser = async (req, res) => {
    const { refreshToken } = req.cookies
    if (refreshToken) {
        try {
            const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET)
            await User.findByIdAndUpdate(decoded.id, { $inc: { refreshTokenVersion: 1 } })
        } catch (e) {}
    }
    res.clearCookie('refreshToken').status(200).json({ ok: true })
}

module.exports ={
    test,
    signupUser,
    loginUser,
    meHandler,
    refreshUser,
    logoutUser,
}