import mongoose from 'mongoose';
//Import the dotenv library to load environment variables
import 'dotenv/config'

export function mongodbconnection(){
    mongoose.connect("mongodb://localhost:27017/tattler_db").then(() => {
        console.log("yeoiiiiiiiiiiiiiiiiiiii");
    })
    .catch(err => {
        console.log(err)
    })
}

