import { Router } from "express";
import {
  getAllExpenses,
  getExpense,
  addExpense,
  deleteExpense,
} from "../services/expenses.service";

const router = Router();

router.get("/", (_req, res) => {
  const expense = getAllExpenses();

  res.status(200).json(expense);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);

  const expense = getExpense(id);

  if (!expense) {
    return res.status(404).json({
      message: "Expense not found",
    });
  }

  res.status(200).json(expense);
});

router.post("/", (req, res) => {
  const { groupId, description, amount, paidBy, participantIds } = req.body;

  if (
    groupId === undefined ||
    !description ||
    amount === undefined ||
    paidBy === undefined ||
    !participantIds
  ) {
    return res.status(400).json({
      message:
        "Name, description, amount, payee ID, and member IDs are required",
    });
  } else if (participantIds.includes(paidBy) != true) {
    return res
      .status(400)
      .json({ message: "Payee ID should be included in member IDs" });
  } else if (amount < 0) {
    return res
      .status(400)
      .json({ message: "Amount paid should be a positive number" });
  }

  let result = addExpense(groupId, description, amount, paidBy, participantIds);

  if (result.success === false && result.reason === "user") {
    return res.status(404).json({
      message: "Id " + result.invalidUserId + " not found",
    });
  } else if (result.success === false && result.reason === "group") {
    return res.status(404).json({
      message: "Group " + result.invalidGroupId + " not found",
    });
  }

  res.status(201).json(result.expense);
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);

  const expense = deleteExpense(id);

  if (!expense) {
    return res.status(404).json({
      message: "Expense not found",
    });
  }

  res.status(204).send();
});

export default router;
