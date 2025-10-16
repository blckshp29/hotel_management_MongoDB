const mongoose = require('mongoose');

/**
 * Connects the application to the MongoDB database using Mongoose.
 * It uses the MONGO_URI environment variable or falls back to a local URI.
 */
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // useNewUrlParser: true, // Deprecated in Mongoose 6+
            // useUnifiedTopology: true // Deprecated in Mongoose 6+
        });
        console.log(` MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(' MongoDB connection failed:', err.message);
        // Exit process with failure
        process.exit(1);
    }
};

module.exports = connectDB;