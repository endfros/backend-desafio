import express from 'express'
import cors from 'cors'
import postsRouter from './routers/card.router.js'
import writersRouter from './routers/user.router.js'
import authRouter from './routers/auth.router.js'
import commentRouter from './routers/comment.router.js'
import errorHandler from './middlewares/errorHandler.js'

const server = express()

// apartir de aqui irian los middlewares
server.use(express.json())
server.use(cors())

// apartir de aqui irian los Routers
server.use('/post', postsRouter)
server.use('/writer', writersRouter)
server.use('/auth', authRouter)
server.use('/comment', commentRouter)

// middleware - handleErrors 
server.use(errorHandler())

//se exporta para usarlo en el index.js
export {server}