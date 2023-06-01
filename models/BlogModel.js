const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    fuente: {
        type: String,
        required: true
    }
})

const BlogModel = mongoose.model("BlogModel", BlogSchema);

module.exports = BlogModel;