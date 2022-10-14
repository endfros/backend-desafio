import {Comment} from '../models/comment.models.js'

function getAll(){
    return Comment.find({})
}

function getById(id){
    return Comment.findById(id)
}

function getByPost(id){
    return Comment.find({card: id})
}

function getByUser(id){
    return Comment.find({user: id})
}

function create(newComment){
    return Comment.create(newComment)
}

function update(id, newComment){
    return Comment.findByIdAndUpdate(id, newComment, {new : true})
}

function deleteById(id){
    return Comment.findByIdAndDelete(id)
}

function deletePostComments(idCard){
    return Comment.deleteMany({card:idCard})
}

export {
    create, 
    getAll,
    getById,
    getByPost,
    getByUser,
    update,
    deleteById,
    deletePostComments
}