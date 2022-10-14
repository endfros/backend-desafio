import {Card} from '../models/card.models.js'
import jwt from 'jsonwebtoken'

function getAll(){
    return Card.find({}).populate('user')
}

function getById(id){
    return Card.findById(id).populate('user')
}

function getPostByUserId(id){
    return Card.find({user: id})
}

function getByUser(id){
    return Card.find({user: id})
}

function deleteById(id){
    return Card.findByIdAndDelete(id)
}

async function create (newCard,user){
    const {title, body, hashtags, img, reactions, readingTime, date} = newCard
    return Card.create({title, body, hashtags, img, reactions, readingTime, date, user})
}

function createComment (idCard, idComment){
    return Card.findByIdAndUpdate(idCard, {$push:{comment: idComment}}, {new : true})
}

function deleteComment(idCard, idComment){
    return Card.findByIdAndUpdate(idCard, {$pull:{comment: idComment}}, {new : true})
    
}

function update(idCard, unupdatedCard){
    return Card.findByIdAndUpdate(idCard, unupdatedCard, {new : true})
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
