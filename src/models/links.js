const mongoose = require('mongoose');
const validator = require('validator');


const linksSchema = new mongoose.Schema({
    slug: {
        type: String,
        required: false,
        trim: true,
        unique: true,
        match: [/^[a-z0-9]+$/i],
        lowercase: true
    },
    url: {
        type: String,
        required: true,
        trim: true,
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("not a url")
            }
        }

    }
})

const Link = mongoose.model('Link', linksSchema)

module.exports = Link;