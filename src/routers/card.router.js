import express from 'express';
import * as cardUseCase from '../useCase/card.use.js'

const router = express.Router();

router.get('/', async (request,response) => {
    try{
        const allPosts = await cardUseCase.getAll()

        response.json({
            success: true,
            data: {
                posts: allPosts
            }
        })
    } catch (error) {
        response.status(400).json({
            success: false,
            message: error.message
        })
    }
})

router.get('/:idPost', async (request,response) => {
    try{
        const {idPost} = request.params
        const card = await cardUseCase.getById(idPost)

        response.json({
            success: true,
            data: {
                cards: card
            }
        })
    } catch (error) {
        response.status(400).json({
            success: false,
            message: error.message
        })
    }
})

router.post('/', async (request, response)=>{
    try{
        const newCard = request.body
        const cardCreated = await cardUseCase.create(newCard)
        response.status(200).json({
            success: true,
            card: cardCreated
        })
    } catch (error){
        response.status(400).json({
            success: false,
            message: error.message
        })
    }
})

router.delete('/:idPost', async (request, response)=>{
    try{
        const {idPost} = request.params
        const cardDeleted = await cardUseCase.deleteById(idPost)
        response.status(200).json({
            success: true,
            card: cardDeleted,
            message: "card Deleted!"
        })
    } catch (error){
        response.status(400).json({
            success: false,
            message: error.message
        })
    }
})

router.patch('/:idPost', async (request, response)=>{
    try{
        const updateCardRequest = request.body
        const {idPost} = request.params
        const cardUpdated = await cardUseCase.update(idPost, updateCardRequest)
        response.status(200).json({
            success: true,
            card: cardUpdated,
            message: "card Updated!"
        })
    } catch (error){
        response.status(400).json({
            success: false,
            message: error.message
        })
    }
})


export default router