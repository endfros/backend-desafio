import express from 'express';
import * as cardUseCase from '../useCase/card.use.js'
import {auth} from '../middlewares/auth.js'
import {Card} from '../models/card.models.js'

const router = express.Router();

router.get('/', async (request,response) => {
    try{
        const allPosts = await cardUseCase.getAll()
        console.log(allPosts)

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
        const id = request.params.idPost
        console.log(Card)
        const card = await cardUseCase.getById(id).populate('user')

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

router.post('/', auth,async (request,response,next) => {
    try{
        const {body: newPostContent} = request
        console.log(token)
        const newPost = await cardUseCase.create(newPostContent)
        
        response.json({
            success: true,
            data: {
                post: newPost
            }
        })
    } catch (error) {
        response.status(400).json({
            success: false,
            message: error.message
        })
    }
})

router.delete('/:idPost', auth, async (request,response) => {
    try{
        const id = request.params.idPost
        const post = await cardUseCase.deleteById(id)

        response.json({
            success: true,
            data: {
                deletedPost: post
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