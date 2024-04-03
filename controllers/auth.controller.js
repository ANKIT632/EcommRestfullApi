const bcrypt = require('bcryptjs');
const user_model = require('../models/user.model.js');
const jwt = require('jsonwebtoken');
const secret = require('../config/auth.config.js');

// create user
// 8 is salt.
exports.signup = async (req, res) => {  // name export

    const req_body = req.body;

    const userObj = {
        name: req_body.name,
        userId: req_body.userId,
        email: req_body.email,
        userType: req_body.userType,
        password: bcrypt.hashSync(req_body.password, 8),
    }

    try {
        const user_created = await user_model.create(userObj);

        res.status(200).send(user_created);
    }
    catch (err) {
        console.log("wwhile registering user", err);
        res.status(500).send({ message: "some error happen while registering the user" });
    }
}




exports.signin = async (req, res) => {

    const { userId, password } = req.body;

    //check user id is present in the system.
    const user = await user_model.findOne({ userId: userId });

    if (user == null) {
        return res.status(400).send({
            message: "user id passed is not a valid id"
        });
    }

    // Password is  correct or not.
    // Note here not require the salt in compareSync method because automatically add in hash password it is extract from hash password.
    
    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).send({ message: 'Failed! password is not correct' });
    }

    // using jwt we will create the access token with a given TTL(time to live) and return
    // 120 sec. pass payload,key,time
    const token = jwt.sign({ id: user.userId }, secret.sercetKey, { expiresIn: 240 });


    res.status(200).send(
        {
            name: user.name,
            userId: user.userId,
            email: user.email,
            userType: user.userType,
            accessToken: token
        });

}