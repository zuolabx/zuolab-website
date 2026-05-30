import mongoose from "mongoose";
type ConnectionObject = {
  isConnected?: number;
};

const connection: ConnectionObject = {};

export  default async function dbConnect(){
  if(connection.isConnected){
    console.log("Already connected to Database!");
    return;
  }
  try {
    if(!process.env.MONGO_DB_URI || !process.env.DB_NAME){
      console.log("Missing Database enviroment variables!")
    }
    const connectionInstance=await mongoose.connect(`${process.env.MONGO_DB_URI}${process.env.DB_NAME}`);
    connection.isConnected=1;
    console.log(
      `MongoDB successfully connected. DB Host = ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("Error connecting to MongoDB [at connectDB]:", error);
    
  }
}