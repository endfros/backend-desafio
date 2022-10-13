import {Card} from '../models/card.models.js'

function getAll(){
    return Card.find({}).populate('user')
}

function getById(id){
    return Card.findById(id).populate('user')
}

function getByUser(id){
    return Card.find({user: id})
}

function deleteById(id){
    return Card.findByIdAndDelete(id)
}

function create (newCard){
    return Card.create(newCard)
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
    deleteById,
    update, 
    create, 
    createComment,
    deleteComment}