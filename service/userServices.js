const {getUsersFromDatabase}=require('../database/userDatabase');

const getUsers=(minAge,callback)=>{
    getUsersFromDatabase((err,users)=>{
        if(err){
            return callback(err,null);
        }
        if(minAge){
            const minimumAge=Number(minAge);
            const filteredUsers=users.filter((user)=>user.age>=minimumAge);
            return callback(null,filteredUsers);
        }
        callback(null,users);
    })
};

module.exports={getUsers};