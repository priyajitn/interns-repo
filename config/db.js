const mongoose = require("mongoose");

const dbConnect =async() => {
    try {
        const dbUrl =process.env.DBURL;
        mongoose.connect(dbUrl)
        console.log("Database Connected");
    }
    catch(err){
        console.log(`Database Connection error: ${err}`)
    }

}

module.exports=dbConnect;
