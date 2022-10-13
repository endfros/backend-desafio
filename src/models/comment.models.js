import mongoose from 'mongoose'

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        minLenght: 1,
        maxLenght: 280,
        trim: true
    },
    reactions: {
        type: Number,
        required: true,
        default: 0
    },
    date:{
        type: Date, 
        default: Date.now
    },
    user:{
        type: mongoose.Schema.Types.ObjectId, ref:'users'
    },
    card:{
        type: mongoose.Schema.Types.ObjectId, ref:'cards'
    }
})

const Comment = mongoose.model('comment', commentSchema )

export {Comment}