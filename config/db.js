// Async/await is a way to write asynchronous code in JavaScript that looks and behaves like synchronous code. It allows you to write code that can perform tasks without blocking the main thread of execution, making your code more efficient and responsive. The async keyword is used to define a function as asynchronous, and the await keyword is used to wait for the completion of an asynchronous operation before moving on to the next line of code. This makes it easier to write and understand asynchronous code, without the complexity of callbacks or chaining of promises.
// `` 
import mongoose from "mongoose";

const connectDB =async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URL);
        console.log(`Connect to MongoDB Database ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error in mongodb ${error}`)
    }
};

export default connectDB;




