const mongoose = require('mongoose');
require('dotenv').config();

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const CLUSTER = process.env.CLUSTER
const PORT = process.env.PORT

module.exports = async function connect() {
    try {
        await mongoose.connect(`mongodb://${DB_USER}:${DB_PASSWORD}@${CLUSTER}:${PORT}/test`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("connected to MongoDB");
    }
    catch (error) {
        console.log(error);
    }
}
