import express from 'express'
import postsRouter from './routers/card.router.js'
import writersRouter from './routers/user.router.js'
import authRouter from './routers/auth.router.js'
import commentRouter from './routers/comment.router.js'

const server = express()

// apartir de aqui irian los middlewares
server.use(express.json())

server.use('/post', postsRouter)
server.use('/writer', writersRouter)
server.use('/auth', authRouter)
server.use('/comment', commentRouter)


// apartir de aqui irian los Routers
// server.use('/auth', authRouter)

// middleware - handleErrors 


//se exporta para usarlo en el index.js
export {server}