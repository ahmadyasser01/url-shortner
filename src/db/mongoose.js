const mongoose = require('mongoose');

try {
    mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,

    }).then(connected => {
        console.log(connected)
    }).catch(err => { throw new Error("can;t connect") })
}
catch (e) {
    console.log(e);
}



