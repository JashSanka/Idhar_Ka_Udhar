const fs = require("fs");
const path = require("path");

const pathToFile2 = path.join(__dirname, "users.json");

const getUsersFromDatabase=(callback)=>{
    fs.readFile(pathToFile2,'utf-8',(err,data)=>{
        if(err){
            return callback(err,null);
        }
        try{
            const users=JSON.parse(data);
            callback(null,users);
        }catch(error){
            callback(error,null);
        }
    })
};

module.exports={getUsersFromDatabase};