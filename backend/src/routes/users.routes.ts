import { Router } from "express";
import { users } from "../data/users";

const router = Router();

console.log("Users routes loaded");

router.get("/", (_req, res) => {
  res.status(200).json(users);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const user = users.find((user) => user.id === id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.status(200).json(user);
});

router.post("/", (req, res) => {
  const { name, email } = req.body;

  const newUser = {
    id: users.length + 1,
    name,
    email,
  };

  users.push(newUser);

  res.status(201).json(newUser);
});

export default router;
