const {getBooksFromDatabase}=require('../database/booksDatabase');

const getBooks=(minPrice,callback)=>{
    getBooksFromDatabase((err,books)=>{
        if(err){
            return callback(err,null);
        }
        if(minPrice){
            const minimumPrice=Number(minPrice);
            const filteredPrice=users.filter((user)=>user.price>=minimumPrice);
            return callback(null,filteredPrice);
        }
        callback(null,books);
    })
};

module.exports={getBooks};