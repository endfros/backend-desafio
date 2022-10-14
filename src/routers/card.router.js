import express from 'express';
import * as cardUseCase from '../useCase/card.use.js'
import * as commentUseCase from '../useCase/comment.use.js'
import {auth} from '../middlewares/auth.js'



const router = express.Router();

router.get('/', async (request,response) => {
    try{
        let allPosts = ''
        const{idUser} = request.query

        if(idUser){
            allPosts = await cardUseCase.getByUser(idUser)
        }else{
            allPosts = await cardUseCase.getAll()
        }
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


router.delete('/:idPost',auth, async (request, response)=>{
    try{
        const {idPost} = request.params
        const cardDeleted = await cardUseCase.deleteById(idPost)
        const commentsDeleted = await commentUseCase.deletePostComments(idPost)
        response.status(200).json({
            success: true,
            card: cardDeleted,
            comments: commentsDeleted,
            message: "card Deleted!"
        })
    } catch (error){
        response.status(400).json({
            success: false,
            message: error.message
        })
    }
})

router.patch('/:idPost',auth, async (request, response)=>{
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