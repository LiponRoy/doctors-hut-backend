import mongoose from "mongoose";

const DatabaseConnect=async()=>{
    try {
        await mongoose.connect(process.env.MONGO_DB,{
            // useNewUrlParser:true,
            // useUnifiedTopology:true
        })

        console.log("CONNECTED TO DATABASE SUCCESSFULLY");
        
    } catch (error) {
        console.error('COULD NOT CONNECT TO DATABASE:', error.message);
        
    }

}
export default DatabaseConnect;
