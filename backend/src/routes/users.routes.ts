import { Router } from "express";
import {
  getAllUsers,
  getUser,
  addUser,
  deleteUser,
} from "../services/users.service";

const router = Router();

router.get("/", (_req, res) => {
  const users = getAllUsers();

  res.status(200).json(users);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = getUser(id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.status(200).json(user);
});

router.post("/", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({
      message: "Name and email are required",
    });
  }

  const newUser = addUser(name, email);

  res.status(201).json(newUser);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = deleteUser(id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.status(204).send();
});

export default router;
