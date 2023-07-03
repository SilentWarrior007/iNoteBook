const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note')

//Route 1: Get all notes using GET 'api/notes/fetchallnotes'
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})

//Route 2: Add notes using POST 'api/notes/addnote'
router.post('/addnote', [
    //validating data
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a proper description').isLength({ min: 5 })
], fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }

})

//Route 3: Delete a note using DELETE 'api/notes/deletenote'
router.delete('/deletenote/:id', fetchuser, async (req, res) => {
    const {title, description, tag} = req.body;
    try {
        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("User note not found");
        }
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndDelete(req.params.id);
        res.json({"Success": "Note has been deleted", note:note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})


//Route 4: Update an existing note using PUT 'api/notes/updatenote'
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    const {title, description, tag} = req.body;
    try {
        const newNote = {};
        if(title){
            newNote.title = title;
        }
        if(description){
            newNote.description = description;
        }
        if(tag){
            newNote.tag = tag;
        }

        let note = await Note.findById(req.params.id);
        if(!note){
            return res.status(404).send("User note not found");
        }
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed");
        }

        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
        res.json({note});
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured");
    }
})

module.exports = router;