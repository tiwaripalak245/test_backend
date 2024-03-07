const express = require('express')
const router = express.Router({mergeParams: true})
const {getNote, addNote} = require('../controllers/noteController')
const { protect } = require('../middileware/authMiddileware')


router.route("/").get(protect, getNote).post(protect, addNote)


module.exports = router