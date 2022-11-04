import express from "express";
import * as commentUseCase from "../useCase/comment.use.js";
import * as cardUseCase from "../useCase/card.use.js";
import jwt from "jsonwebtoken";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/:idPost", async (request, response, next) => {
  try {
    const { idPost } = request.params;
    const allPostComments = await commentUseCase.getById(idPost);
    response.json({
      success: true,
      data: {
        comment: allPostComments,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/me", auth, async (request, response, next) => {
  try {
    const { auth } = request;
    allComments = await commentUseCase.getByUser(auth);
    response.json({
      success: true,
      data: {
        comment: allComments,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (request, response, next) => {
  try {
    const newCommentContent = request.body;
    const { auth } = request;
    const newComment = await commentUseCase.create(newCommentContent, auth);
    const cardUpdated = await cardUseCase.createComment(
      newComment.card,
      newComment.id
    );
    response.json({
      success: true,
      data: {
        comment: newComment,
      },
      card: {
        cardUpdate: cardUpdated,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/:idComment", auth, async (request, response, next) => {
  try {
    const { idComment } = request.params;
    const { auth } = request;
    const unupdatedComment = request.body;
    const updatedComment = await commentUseCase.update(
      idComment,
      auth,
      unupdatedComment
    );
    response.json({
      success: true,
      data: {
        comment: updatedComment,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:idComment", auth, async (request, response, next) => {
  try {
    const { idComment } = request.params;
    const { auth } = request;
    const commentDeleted = await commentUseCase.deleteById(idComment, auth);
    const cardId = commentDeleted.card.toString();
    const cardUpdated = await cardUseCase.deleteComment(
      cardId,
      commentDeleted.id
    );
    response.json({
      success: true,
      data: {
        comment: commentDeleted,
      },
      card: {
        card: cardUpdated,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
