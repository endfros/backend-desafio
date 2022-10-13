import express from 'express';
import * as userUseCase from '../useCase/user.use.js'

const router = express.Router();

router.get('/', async (request,response) => {
    try{
        const allWriters = await userUseCase.getAll()
        
        response.json({
            success: true,
            data: {
                writers: allWriters
            }
        })
    } catch (error) {
        response.status(400).json({
            success: false,
            message: error.message
        })
    }
})

router.get('/:idUser', async (request,response) => {
    try{
        const id = request.params.idUser
        const user = await userUseCase.getById(id)

        response.json({
            success: true,
            data: {
                users: user
            }
        })
    } catch (error) {
        response.status(400).json({
            success: false,
            message: error.message
        })
    }
})


router.patch('/:idUser', async (request,response) => {
    try{
        const id = request.params.idUser
        const newDataUser = request.body
        const updatedUser = await userUseCase.update(id,newDataUser)
        
        response.json({
            success: true,
            data: {
                users: updatedUser
            }
        })
    } catch (error) {
        response.status(400).json({
            success: false,
            message: error.message
        })
    }
})

router.delete('/:idUser', async (request,response) => {
    try{
        const id = request.params.idUser
        const user = await userUseCase.deleteById(id)

        response.json({
            success: true,
            data: {
                users: user
            }
        })
    } catch (error) {
        response.status(400).json({
            success: false,
            message: error.message
        })
    }
})

router.post('/', async (request,response) => {
    try{
        const newDataUser = request.body
        const newUser = await userUseCase.create(newDataUser)

        response.json({
            success: true,
            data: {
                users: newUser
            }
        })
    } catch (error) {
        response.status(400).json({
            success: false,
            message: error.message
        })
    }
})


export default router