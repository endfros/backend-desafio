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


export default router