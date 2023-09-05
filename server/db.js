const mongoose = require("mongoose");

const mongoConnect = async () => {
    try {
        const mongoUri = process.env.MONGO_URI;

        if (!mongoUri) {
            console.error("MONGO_URI environment variable is not set");
            return;
        }

        await mongoose.connect(mongoUri);

        console.log(`Database Connection Established`);
    } catch (error) {
        console.error(`Database Connection Failed: ${error}`);
    }
};

module.exports = mongoConnect