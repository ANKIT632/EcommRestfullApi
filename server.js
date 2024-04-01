const express = require('express');
const mongoose = require('mongoose');
const serverConfig = require('./config/server.config.js');
const db_config = require('./config/db.config.js');
const user_model = require('./models/user.model.js');
const bcrypt = require('bcryptjs');

const app = express();


// middleware convert json to js object.
app.use(express.json());


async function init() {

    // create admin
    const user = await user_model.findOne({ userId: "admin" });

    try {
        if (user) {
            console.log("admin", user);
            return;
        }
    }
    catch (err) {
        console.log("error while read admin data", err);
    }


    try {
        user = await user_model.create({
            name: 'Ankit kumar gupta',
            userId: "admin",
            email: "ankitgupta@gmail.com",
            userType: "ADMIN",
            password: bcrypt.hashSync('hdueubxiw', 8)

        })
        console.log('admin created : ', user);
    }
    catch (err) {
        console.log("while creating admin : ", err);
    }

}

// calling route and pass the app object.

require('./routes/auth.route.js')(app);
require('./routes/category.route.js')(app);
  


mongoose.connect(db_config.DB_URL).then(() => {
    init();
}).catch((err) => {
    console.log("db_connection fail! : ",err);
});


app.listen(serverConfig.PORT, () => {
    console.log('server start at Port Number :', serverConfig.PORT);
})



// post number is customize , therefor we use config.