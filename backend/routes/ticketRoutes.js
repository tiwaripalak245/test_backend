const express = require('express')
const { createTicket, getTickets, singleTicket, updateTicket, deleteTicket } = require('../controllers/ticketController')
const { protect } = require('../middileware/authMiddileware')

const router = express.Router()

// router.post('/', protect, createTicket)
// router.get('/', protect, getTickets)

router.route('/').get(protect, getTickets).post(protect, createTicket)
router.route("/:id")
.get(protect, singleTicket)
.delete(protect, deleteTicket)
.put(protect, updateTicket)

// re routing towards /api/ticket/:ticketId/note

router.use("/:ticketId/note", require("./noteRoutes"))

module.exports = router