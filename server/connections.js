const mongoose = require('mongoose')
const mongodbPassword = "XNR8XrdYRi87NBln"
const dbURL = `mongodb+srv://loginpage:${mongodbPassword}@loginpage.cou3ue7.mongodb.net/?retryWrites=true&w=majority`

mongoose.connect(dbURL).then(() => {
    console.log('Database Connected');
}).catch((error) => {
    console.log("error occured",error)
})
