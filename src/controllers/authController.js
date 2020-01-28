const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth'); 

const router = express.Router();

router.post('/register', async(req, res) => {

    const { email } = req.body;

    if(await User.findOne({ email })){
        return res.status(400).send({error : 'User already exists'});
    }

    try{
        const user = await User.create(req.body);
        user.password = undefined;

        return res.send({ 
            user,
            token: generateToken({id : user.id}) 
        });

    }catch(err){
        return res.status(400).send({ error : 'Registration Failed'});
    }
});

router.post('/authenticate', async(req, res) => {
    const { email, password} = req.body;

    const user = await User.findOne({ email }).select('+password');

    if(!user){
        return res.status(400).send({error : 'User not found!'})
    }
    
    if(!await bcrypt.compare(password, user.password)){
        return res.status(400).send({error : 'Invalid Password!'})
    }

    user.password = undefined;

    res.send({ 
        user, 
        token: generateToken({id : user.id}) 
    });
});

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
}

module.exports = app => app.use('/auth', router);