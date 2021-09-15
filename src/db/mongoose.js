const mongoose = require('mongoose');
const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,

    }).then(connected => {
        console.log(connected)
    }).catch(err => { throw new Error("can;t connect") })
}
try {
    connect();
}
catch (e) {
    return console.log(e);
}



