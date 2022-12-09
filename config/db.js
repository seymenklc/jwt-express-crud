import mongoose from 'mongoose';

const connectDB = async () => {
    const connectionString = process.env.CONNECTION_URL;
    try {
        mongoose.connect(connectionString, {
            useFindAndModify: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useNewUrlParser: true
        });
        console.log('Successfully connected to MongoDB.');
    } catch (error) {
        console.log('Failed to connect MongoDB.');
        process.exit(1);
    }
};

export default connectDB;