const mongoose = require('mongoose')

//Connect Database Connection

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.then(() => console.log('Database Connected'))
.catch(err => console.log(err));