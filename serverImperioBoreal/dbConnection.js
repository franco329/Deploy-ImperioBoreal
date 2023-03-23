const mongoose = require('mongoose');
require('dotenv').config();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const CLUSTER = process.env.CLUSTER
const DB_PORT = process.env.DB_PORT

// mongodb+srv://<username>:<password>@cluster0.a9jnlqj.mongodb.net/test
module.exports = async function connect() {
    try {
        await mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}@${CLUSTER}.mongodb.net/ImperioBoreal`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("connected to MongoDB");
    }
    catch (error) {
        console.log(error);
    }
}
