import mongoose from 'mongoose'

const cardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLenght: 1,
        maxLenght: 120,
    },
    body: {
        type: String,
        required: true,
    },
    hashtags: [{
        type: String,
    }],
    img: {
        type: String,
        trim: true
    },
    reactions: {
        type: Number,
        required: true,
        default: 0
    },
    readingTime: {
        type: Number,
        required: true,
        default: 1
    },
    date:{
        type: Date, 
        default: Date.now,
    },
    user:{
        type: mongoose.Schema.Types.ObjectId, ref: 'user' 
    },
    comment:[{
        type: mongoose.Schema.Types.ObjectId, ref: 'comment' 
    }]

})

const Card = mongoose.model('card', cardSchema )

export {Card}