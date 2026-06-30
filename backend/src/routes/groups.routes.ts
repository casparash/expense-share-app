import { Router } from "express";
import {
  getAllGroups,
  getGroup,
  addGroup,
  deleteGroup,
} from "../services/groups.service";

const router = Router();

router.get("/", (_req, res) => {
  const groups = getAllGroups();

  res.status(200).json(groups);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const group = getGroup(id);

  if (!group) {
    return res.status(404).json({
      message: "Group not found",
    });
  }

  res.status(200).json(group);
});

router.post("/", (req, res) => {
  const { name, memberIds } = req.body;

  if (!name || !memberIds) {
    return res.status(400).json({
      message: "Name and member IDs are required",
    });
  }

  let success,
    newGroup = addGroup(name, memberIds);

  if (success === false) {
    return res.status(404).json({
      message: "Id " + newGroup + " not found",
    });
  }

  res.status(201).json(newGroup);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const group = deleteGroup(id);

  if (!group) {
    return res.status(404).json({
      message: "Group not found",
    });
  }

  res.status(204).send();
});

export default router;
