const asynchHandler = require("express-async-handler");
const User = require("../model/userModel");
const Ticket = require("../model/ticketModel");
const Note = require("../model/noteModel");

const addNote = asynchHandler(async (req, res) => {
  const user = User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }

  const ticket = await Ticket.findById(req.params.ticketId);
  if (!ticket) {
    res.status(404);
    throw new Error("ticket not found");
  }


  if (ticket.user.toString() !== req.user.id) {
     res.status(401)
     throw new Error("user unauthorized")

  }

  const note = await Note.create({
    text: req.body.text,
    isStaff: false,
    ticket: req.params.ticketId,
    user: req.user.id,
  });

  if (!note) {
    res.status(401);
    throw new Error("note not created");
  }

  res.status(200).json(note);
});

const getNote = asynchHandler(async (req, res) => {
  const user = User.findById(req.user.id);
  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }

  const ticket = await Ticket.findById(req.params.ticketId);


  if (!ticket) {
    res.status(404);
    throw new Error("ticket not found");
  }
  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("you are unauthorized")
  }

  const notes = await Note.find({ ticket: req.params.ticketId });

  if (!notes) {
    res.status(401);
    throw new Error("notes not found");
  }

  res.status(200).json(notes);
});

module.exports = { addNote, getNote };
