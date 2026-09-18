const User = require('../models/user')

const test = (req,res)=>{
    res.json('test is working')
}

const registerUser = async (req, res) => {
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

        const user = await User.create({ name, email, password });

        return res.status(201).json(user);
    } catch (error) {
        console.log('error', error.message);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

module.exports ={
    test,
    registerUser
}