const jwt = require('jsonwebtoken')

const signAccessToken = (user) =>
    jwt.sign(
        { id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '15m' }
    )

const signRefreshToken = (user) =>
    jwt.sign(
        { id: user._id, ver: user.refreshTokenVersion },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    )

module.exports = { signAccessToken, signRefreshToken }