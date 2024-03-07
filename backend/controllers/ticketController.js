const asyncHandler = require("express-async-handler");
const Ticket = require("../model/ticketModel");
const User = require("../model/userModel");

const createTicket = asyncHandler(async (req, res) => {
  const { product, description, status } = req.body;
  console.log(req.body)
  if (!product || !description) {
    res.status(400);
    throw new Error("please fill all details");
  }
  // get user from jwt
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status({ status: 400, message: "user not found" });
  }

  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: "new"
  });

  res.send(ticket);
});

const getTickets = asyncHandler(async (req, res, next) => {
  // get user from jwt
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status({ status: 401, message: "user not found" });
  }

  const tickets = await Ticket.find({ user: req.user.id });
  if (!tickets) {
    res.status(404);
    throw new Error("tickets not found");
  }

  res.status(200).json(tickets);
});

const singleTicket = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status({ status: 401, message: "user not found" });
  
    }

    const ticket = await Ticket.findById(req.params.id)
    if (!ticket) {
       res.status(404)
       throw new Error("ticket not found") 
    }

    res.status(200).json(ticket)

})

const deleteTicket = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user.id)
    if (!user) {
       res.status(401)
       throw new Error("user not found") 
    }

    const ticket = await Ticket.findById(req.params.id)
    if (!ticket)  {
      res.status (401)
      throw new Error("Ticket not found!")
    }

    if (ticket.user.toString() !== req.user.id) {
      res.status(401)
      throw new Error("not authorized")
    } else{
      await Ticket.findByIdAndDelete(req.params.id)
      res.status(200).json({
        msg: "ticket deleted"
      })
    }


})

const updateTicket = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user.id)
    if (!user) {
        res.status({ status: 401, message: "user not found" });
  
    }

    const ticket = await Ticket.findById(req.params.id)
if (!ticket) {
    res.status(400)
    throw new Error("ticket not found")
} 
if (ticket.user.toString() !== req.user.id) {
  res.status(401)
  throw new Error("not auhtorized")
}


const ticketUpdated = await Ticket.findByIdAndUpdate(req.params.id, req.body, {new: true})
res.status(200).json(ticketUpdated)
})


module.exports = { createTicket, getTickets, singleTicket, deleteTicket, updateTicket };
