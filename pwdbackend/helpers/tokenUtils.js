const jwt = require('jsonwebtoken')

const signAccessToken = (user) =>
    jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
    )

module.exports = { signAccessToken }