import express from "express";
import * as userUseCase from "../useCase/user.use.js";
import { auth } from "../middlewares/auth.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.use(express.json());

router.get("/", async (request, response, next) => {
  try {
    const allWriters = await userUseCase.getAll();

    response.json({
      success: true,
      data: {
        writers: allWriters,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/user:idUser", async (request, response, next) => {
  try {
    const id = request.params.idUser;
    const user = await userUseCase.getById(id);
    response.json({
      success: true,
      data: {
        users: user,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/me", auth, async (request, response, next) => {
  try {
    const { auth } = request;
    const user = await userUseCase.getById(auth);
    response.json({
      success: true,
      data: {
        users: user,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/:idUser", auth, async (request, response, next) => {
  try {
    const id = request.params.idUser;
    const { auth } = request;
    const newDataUser = request.body;
    const updatedUser = await userUseCase.update(id, auth, newDataUser);

    response.json({
      success: true,
      data: {
        users: updatedUser,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:idUser", auth, async (request, response, next) => {
  try {
    const id = request.params.idUser;
    const { auth } = request;
    const user = await userUseCase.deleteById(id, auth);

    response.json({
      success: true,
      data: {
        users: user,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (request, response, next) => {
  try {
    const { body: newDataUser } = request;
    const newUser = await userUseCase.create(newDataUser);

    response.json({
      success: true,
      data: {
        users: newUser,
      },
    });
  } catch (error) {
    next(error);
  }
});

export default router;
