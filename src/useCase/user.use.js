import {User} from '../models/user.models.js'
import bcrypt from '../libs/bcrypt.js'

function getAll(){
    return User.find({})
}

function getById(id){
    return User.findById(id)
}

function deleteById(id){
    return User.findByIdAndDelete(id)
}

async function create (newUser){
    const {name, username, img, email, password, bio, nationality} = newUser

    const userFound = await User.findOne({email})

    if(userFound) throw new Error('Ya existe un koder con este email')

    //Encriptar el password
    const encriptedPassword = await bcrypt.hash(password)

    return User.create({name, username, email, img, ...userFound, password: encriptedPassword, bio, nationality})
}

function update(idUser, unupdatedUser){
    return User.findByIdAndUpdate(idUser, unupdatedUser, {new : true})
}

export {
    getAll,
    getById,
    deleteById,
    update,
    create}