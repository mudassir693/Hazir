// const mongoose = require('mongoose')

// const connectDB = async (req, res) => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI)
//         console.log('mongoDB connected');
//     } catch (error) {
//         console.log('error: ',error);
//     }
// }

// // module.exports = connectDB

const mongoose = require('mongoose')

const connectDB = async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('mongoDB connected');
    } catch (error) {
        console.log('error: ',error);
    }
}

module.exports = connectDB
