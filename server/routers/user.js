const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');
const {getGoogleAccountFromCode} = require('../services/google-utils');
const getFacebookUserData = require('../services/facebook-utils');
const router = express.Router();

router.post('/api/users/signup', async (req, res) => {
    // Create a new user
    try {
        const {email, name, password} = req.body;
        if(!email || !name || !password) return res.status(400).send({error: 'Please fill out all email, name and password'});
        const find = await User.findOne({email});
        if(find) {
            return res.status(401).send({error: 'Signup failed! Already have account'})
        } else {
            const user = new User(req.body)
            await user.save()
            const token = await user.generateAuthToken()
            res.status(201).send({ user, token })
        }
    } 
    catch (error) {
        res.status(400).send(error)
    }
})
router.post('/api/users/login', async(req, res) => {
    //Login a registered user
    try {
        const { email, password } = req.body
        if(!email || !password) {
            return res.status(400).send({error: 'Login failed, please fill your password and your email'})
        }
        const user = await User.findByCredentials(email, password)
        if (!user) {
            return res.status(401).send({error: 'Login failed! Maybe wrong password or email'})
        } else {
            const token = await user.generateAuthToken()
            res.send({ user, token })
        }
    } 
    catch(error) {
        res.status(400).send(error)
    }
})
router.post('/api/users/loginGoogle', async(req, res) => {
    if (req.body.code) {
        const {email, password, name} = await getGoogleAccountFromCode(req.body.code);
        try {
            const find = await User.findOne({email});
            if(find) {
                const token = await find.generateAuthToken();
                res.status(201).send({ user:find, token })
            } else {
                const user = new User({email, password, name});
                await user.save()
                const token = await user.generateAuthToken();
                res.send({ user, token });
            }
        } 
        catch (error) {
            res.status(400).send(error)
        }
    }
})
router.post('/api/users/loginFB', async(req, res) => {
    if (req.body.code) { 
        const {email, password, name} = await getFacebookUserData(req.body.code);
        try {
            const find = await User.findOne({email});
            if(find) {
                const token = await find.generateAuthToken();
                res.status(201).send({ user: find, token })
            } else {
                const user = new User({email, password, name});
                await user.save()
                const token = await user.generateAuthToken();
                res.send({ user, token });
            }
        } 
        catch (error) {
            res.status(400).send(error)
        }
    }
})
router.get('/api/users/me', auth, async(req, res) => {
    // View logged in user profile
    res.send(req.user)
})
router.post('/api/users/me/logout', auth, async (req, res) => {
    // Log user out of the application
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })
        await req.user.save()
        res.send()
    } 
    catch (error) {
        res.status(500).send(error)
    }
})
router.post('/api/users/me/logoutall', auth, async(req, res) => {
    // Log user out of all devices
    try {
        req.user.tokens.splice(0, req.user.tokens.length)
        await req.user.save()
        res.send()
    } 
    catch (error) {
        res.status(500).send(error)
    }
})
module.exports = router