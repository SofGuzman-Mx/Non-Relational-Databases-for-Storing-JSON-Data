import mongoose from 'mongoose';
//Import the dotenv library to load environment variables
import 'dotenv/config'

export function mongodbconnection(){
    mongoose.connect("mongodb://localhost:27017/tattler_db").then(() => {
        console.log("Mongo DB correctly connected");
    })
    .catch(err => {
        console.log(err)
    })
}

