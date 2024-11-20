const dotenv = require('dotenv');
dotenv.config({ path: './src/.env' }); // Specify the path if the .env file is in src directory

const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const dbURI = process.env.MONGO_URI;  // Fetch the MongoDB URI from environment variables
        if (!dbURI) {
            console.error('MONGO_URI is not defined in the .env file');
            process.exit(1);
        }
        await mongoose.connect(dbURI); // No need for useNewUrlParser and useUnifiedTopology anymore
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);  // Exit the process if unable to connect
    }
};

module.exports = connectDB;
