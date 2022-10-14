import {User} from '../models/user.models.js'
import bcrypt from '../libs/bcrypt.js'
import jwt from '../libs/jwt.js'
import {StatusHttp} from '../libs/errorCustom.js'

async function myLogIn(email, password){
    const userFound = await User.findOne({email})
    if(!userFound) throw new StatusHttp('Credenciales Inválidas', 400)

    const isValidPassword = bcrypt.compare(password, userFound.password)

    if(!isValidPassword) throw new StatusHttp('Credenciales inválidas', 400)

    return jwt.sign({id:userFound._id})
}

export {
    myLogIn
}