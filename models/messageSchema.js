import mongoose from "mongoose"


export const messageSchema = new mongoose.Schema({
    timestamp: { type: String, required: true },
    email: {type: String, required: true},
    type: {type: String, required: true},
    text: {type: String, required: true},
    responses: {
        type: [{
            timestamp: { type: String, required: true },
            email: {type: String, required: true},
            response: {type: String, required: true}
        }],
        default: []
    }
})

const Message = mongoose.model('Message', messageSchema)

export {Message}