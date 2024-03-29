const mongoose = require ('mongoose')

const ticketSchema = new mongoose.Schema({
user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
},
product: {
    type: String,
    required: true,
    enum: ["iphone", "ipod", "ipad", "macbook", "imac", "iwatch"] 
},
description: {
    type: String,
    required: true
},
status: {
    type: String,
    required: true,
    enum: ['open', 'closed', 'new'],
    default: 'new'
},
}, {timestamps: true}
 
)

module.exports = mongoose.model('Ticket', ticketSchema)
