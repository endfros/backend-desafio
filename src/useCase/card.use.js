import { Card } from "../models/card.models.js";
import { StatusHttp } from "../libs/errorCustom.js";

async function getAll() {
  const data = await Card.find({}).populate("user").populate("comment");
  if (!data) throw new StatusHttp("There are no posts", 400);
  return data;
}

async function getById(id) {
  const data = await Card.findById(id).populate("user").populate("comment");
  if (!data) throw new StatusHttp("Post not found", 404);
  return data;
}

async function getByUser(id) {
  const data = await Card.find({ user: id })
    .populate("user")
    .populate("comment");
  if (!data) throw new StatusHttp("User has no post.", 400);
  return data;
}

async function deleteById(id, idUser) {
  console.log(id, idUser);
  const data = await Card.findOneAndDelete({ _id: id, user: idUser })
    .populate("user")
    .populate("comment");
  if (!data) throw new StatusHttp("Error", 404);
  return data;
}

async function create(newCard, user) {
  const data = await Card.create({ ...newCard, user });
  if (!data) throw new StatusHttp("An error ocurred", 400);
  return data;
}

async function createComment(idCard, idComment) {
  const data = await Card.findByIdAndUpdate(
    idCard,
    { $push: { comment: idComment } },
    { new: true }
  )
    .populate("user")
    .populate("comment");
  if (!data) throw new StatusHttp("An error ocurred", 404);
  return data;
}

async function deleteComment(idCard, idComment) {
  const data = await Card.findByIdAndUpdate(
    idCard,
    { $pull: { comment: idComment } },
    { new: true }
  )
    .populate("user")
    .populate("comment");
  if (!data) throw new StatusHttp("Post not found", 404);
  return data;
}

async function update(idCard, unupdatedCard, idUser) {
  const data = await Card.findOneAndUpdate(
    { _id: idCard, user: idUser },
    unupdatedCard,
    {
      new: true,
    }
  )
    .populate("user")
    .populate("comment");
  if (!data) throw new StatusHttp("Error", 404);
  return data;
}

export {
  getAll,
  getById,
  getByUser,
  deleteById,
  update,
  create,
  createComment,
  deleteComment,
};
