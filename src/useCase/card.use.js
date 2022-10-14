import {Card} from '../models/card.models.js'
import {StatusHttp} from '../libs/errorCustom.js'
import jwt from 'jsonwebtoken'


async function getAll(){
    const data = await Card.find({}).populate('user').populate('comment')
    if(!data) throw new StatusHttp('There are no posts', 400)
    return data
}

async function getById(id){
    const data = await Card.findById(id).populate('user').populate('comment')
    if(!data) throw new StatusHttp('Post not found', 404)
    return data
}

async function getPostByUserId(id){
    const data = await Card.find({user: id}).populate('user').populate('comment')
    if(!data)throw new StatusHttp('User has no post.', 400)
    return data
}

async function getByUser(id){
    const data = await Card.find({user: id})
    if(!data)throw new StatusHttp('User has no post.', 400)
    return data
}

async function deleteById(id){
    const data = await Card.findByIdAndDelete(id).populate('user').populate('comment')
    if(!data)throw new StatusHttp('Post not found', 404)
    return data
}

async function create (newCard, user){
    const {title, body, hashtags, img, reactions, readingTime, date} = newCard
    const data = await Card.create({title, body, hashtags, img, reactions, readingTime, date, user})
    if(!data)throw new StatusHttp('An error ocurred', 400)
    return data
}

async function createComment (idCard, idComment){
    const data = await Card.findByIdAndUpdate(idCard, {$push:{comment: idComment}}, {new : true}).populate('user').populate('comment')
    if(!data)throw new StatusHttp('An error ocurred', 404)
    return data
}

async function deleteComment(idCard, idComment){
    const data = await Card.findByIdAndUpdate(idCard, {$pull:{comment: idComment}}, {new : true}).populate('user').populate('comment')
    if(!data)throw new StatusHttp('Post not found', 404)
    return data
}

async function update(idCard, unupdatedCard){
    const data = await Card.findByIdAndUpdate(idCard, unupdatedCard, {new : true}).populate('user').populate('comment')
    if(!data)throw new StatusHttp('Post not found', 404)
    return data
}

export {
    getAll,
    getById,
    getByUser,
    getPostByUserId,
    deleteById,
    update, 
    create, 
    createComment,
    deleteComment
    }
