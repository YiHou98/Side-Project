const express = require("express");

const router = express.Router();
const Note = require("../models/noteModel");
router.route("/create").post((req, res) => {
    const fullname = req.body.fullname;
    const email = req.body.email;
    const message = req.body.message;
    const newNote = new Note({
        fullname,
        email,
        message
    });
    newNote.save();

});


module.exports = router;
