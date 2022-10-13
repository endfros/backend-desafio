import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLenght: 3,
        maxLenght: 35,
    },
    date:{
        type: Date, 
        default: Date.now,
        required: true
    },
    nationality: {
        type: String,
        required: true,
        minLenght: 3,
        maxLenght: 30,
    },
    bio: {
        type: String,
        required: true,
        minLenght: 3,
        maxLenght: 350,
    },
    username: {
        type: String,
        required: true,
        minLenght: 3,
        maxLenght: 30,
        trim: true
    },
    img: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        match: /.*@.*\..*/
    },
    password: {
        type: String,
        required: true
    }
})

const User = mongoose.model('users', userSchema )

export {User}