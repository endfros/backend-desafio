import jwt from 'jsonwebtoken'

const JWT_SECRET = 'tlozootmmwwbotwtotk'

function sign(payload){
    return jwt.sign(payload, JWT_SECRET, {expiresIn: '1h'})
}

function verify(token){
    return jwt.verify(token, JWT_SECRET)
}

export default {
    ...jwt, sign, verify
}