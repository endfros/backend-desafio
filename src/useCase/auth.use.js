import {User} from '../models/user.models.js'
import bcrypt from '../libs/bcrypt.js'
import jwt from '../libs/jwt.js'

async function login(email, password){
    const userFound = await User.findOne({email})

    if(!userFound) throw new Error('Credenciales Inválidas')

    const isValidPassword = bcrypt.compare(password, userFound.password)

    if(!isValidPassword) throw new Error('Credenciales inválidas')

    return jwt.sign({id:userFound._id})
}

export default {login}