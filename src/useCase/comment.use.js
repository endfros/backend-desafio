import { Comment } from "../models/comment.models.js";
import { StatusHttp } from "../libs/errorCustom.js";

async function getById(id) {
  const data = await Comment.findById(id).populate("user").populate("card");
  if (!data) throw new StatusHttp("Comment not found", 404);
  return data;
}

async function getByPost(id) {
  const data = await Comment.find({ card: id })
    .populate("user")
    .populate("card");
  if (data == false) throw new StatusHttp("No comments found", 404);
  return data;
}

async function getByUser(id) {
  const data = await Comment.find({ user: id })
    .populate("user")
    .populate("card");
  if (!data) throw new StatusHttp("No comments found", 404);
  return data;
}

async function create(newComment, user) {
  const data = await Comment.create({ ...newComment, user });
  if (!data) throw new StatusHttp("An error ocurred", 400);
  return data;
}

async function update(id, idUser, newComment) {
  const data = await Comment.findOneAndUpdate(
    { _id: id, user: idUser },
    newComment,
    { new: true }
  );
  if (!data) throw new StatusHttp("Comment not found", 404);
  return data;
}

async function deleteById(id, idUser) {
  const data = await Comment.findOneAndDelete({ _id: id, user: idUser });
  if (!data) throw new StatusHttp("Comment not found", 404);
  return data;
}

async function deletePostComments(idCard) {
  const data = await Comment.deleteMany({ card: idCard });
  if (!data) throw new StatusHttp("Comment not found", 404);
  return data;
}

export {
  create,
  getById,
  getByPost,
  getByUser,
  update,
  deleteById,
  deletePostComments,
};
