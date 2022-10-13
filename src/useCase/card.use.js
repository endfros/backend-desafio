import {Card} from '../models/card.models.js'

function getAll(){
    return Card.find({})
}

function getById(id){
    return Card.findById(id)
}

function deleteById(id){
    return Card.findByIdAndDelete(id)
}

async function create (newCard){
    const {email, password} = newCard

    return Card.create({...newCard})
}

function update(idCard, unupdatedCard){
    return Card.findByIdAndUpdate(idCard, unupdatedCard, {new : true})
}

export {
    getAll,
    getById,
    deleteById,
    update, 
    create}