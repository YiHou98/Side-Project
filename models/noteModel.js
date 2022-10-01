const mongoose = require("mongoose");

const notesSchema = {

    fullname: String,
    email: String,
    message: String
}

const Note = mongoose.model("Note", notesSchema,'messages');

module.exports = Note;