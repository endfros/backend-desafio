import {User} from '../models/user.models.js'
import bcrypt from '../libs/bcrypt.js'
import {StatusHttp} from '../libs/errorCustom.js'

async function getAll(){
    const data = await User.find({})
    if(!data) throw new StatusHttp('Users not found', 404)
    return data
}

async function getById(id){
    const data = await User.findById(id)
    if(!data) throw new StatusHttp('User not found', 404)
    return data
}

async function deleteById(id){
    const data = await User.findByIdAndDelete(id)
    if(!data) throw new StatusHttp('User not found', 404)
    return data
}

async function create (newUser){
    const {name, username, img, email, password, bio, nationality} = newUser

    const userFound = await User.findOne({email})

    if(userFound) throw new StatusHttp('Ya existe un koder con este email', 400)

    //Encriptar el password
    const encriptedPassword = await bcrypt.hash(password)

    return User.create({name, username, email, img, ...userFound, password: encriptedPassword, bio, nationality})
}

async function update(idUser, unupdatedUser){
    const data = await User.findByIdAndUpdate(idUser, unupdatedUser, {new : true})
    if(!data) throw new StatusHttp('User not found', 404)
    return data
}

export {
    getAll,
    getById,
    deleteById,
    update,
    create}