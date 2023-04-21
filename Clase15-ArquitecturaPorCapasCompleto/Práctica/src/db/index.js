const mongoose = require("mongoose")
const { dbUser, dbPassword, dbHost, dbName } = require("../config/db.config");

const mongoConnect = async () => {
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(
            `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}?retryWrites=true&w=majority`
        );
        
        console.log("DB connected");
    } catch (error) {
        throw error
    }
}

module.exports = mongoConnect;