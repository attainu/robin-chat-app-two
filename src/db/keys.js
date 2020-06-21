// dbPassword = `mongodb+srv://${process.env.NAME}`+ encodeURIComponent(process.env.PASSWORD) + `${process.env.CLUSTER}.mongodb.net/test?retryWrites=true`;
// module.exports = {
//     mongoURI: dbPassword
// };
// 

//connect local

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/chat-data', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));