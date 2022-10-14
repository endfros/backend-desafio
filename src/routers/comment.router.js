import express from 'express'
import * as commentUseCase from '../useCase/comment.use.js'
import * as cardUseCase from '../useCase/card.use.js'
import {StatusHttp} from '../middlewares/errorCustom.js'

const router = express.Router()

router.get('/:idPost', async(request, response)=>{
    try{
        const {idPost}= request.params
        const allPostComments = await commentUseCase.getById(idPost)
        response.json({
            success: true,
            data: {
                comment: allPostComments
            },
        })
    } catch(error){
        response.json({
            success: false,
            message: error.message
        })
    }
})

router.get('/', async(request, response)=>{
    try{
        const {idUser, idPost} = request.query
        let allComments = '';
        if(idUser){
            allComments = await commentUseCase.getByUser(idUser)
        }else if(idPost){
            allComments = await commentUseCase.getByPost(idPost)
        } 
        else{
            throw new StatusHttp('neither an user nor a post are declare!', 404)
        }

        if (!allComments){
            console.log('no comments found')
            throw new StatusHttp('no comments found!', 404)
        }
        response.json({
            success: true,
            data: {
                comment: allComments
            },
        })
    } catch(error){
        response.json({
            success: false,
            message: error.message
        })
    }
})

router.post('/', async (request, response)=>{
    try{
    const newComment = request.body
    const commentCreated = await commentUseCase.create(newComment)
    const cardUpdated = await cardUseCase.createComment(newComment.card, commentCreated.id)
    response.json({
        success: true,
        data: {
            comment: commentCreated
        },
        cardUpdated : {
            card: cardUpdated
        }
    })
    } catch(error){
        response.json({
            success: false,
            message: error.message
        })
    }
})

router.patch('/:idComment', async (request, response)=>{
    try{
        const {idComment} = request.params
        const unupdatedComment = request.body
        const updatedComment = await commentUseCase.update(idComment, unupdatedComment) 
        response.json({
            success: true,
            data: {
                comment: updatedComment
            },
        })
    } catch (error){
        response.json({
            success: false,
            message: error.message
        })
    }
})

router.delete('/:idComment', async (request, response)=>{
    try{
        const {idComment}= request.params
        const commentDeleted = await commentUseCase.deleteById(idComment)
        const cardId = commentDeleted.card.toString()
        const cardUpdated = await cardUseCase.deleteComment(cardId, commentDeleted.id)
        response.json({
            success: true,
            data: {
                comment: commentDeleted
            },
            card:{
                card : cardUpdated 
            }
        })
    } catch(error){
        response.json({
            success: false,
            message: error.message
        })
    }
})

export default router