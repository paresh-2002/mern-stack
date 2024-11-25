import mongoose from 'mongoose';

export const mongoDBConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("You successfully connected to MongoDB!");
    } catch (error) {
        console.log('mongoDb Error', error);
    }
}