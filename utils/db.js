import mongoose from "mongoose";

const connect = async () => {

    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
    } catch (error) {
        console.log(process.env.MONGO_URL);
        throw new Error("connection failed");

    }
}

export default connect;