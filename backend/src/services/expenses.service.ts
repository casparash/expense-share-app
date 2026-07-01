import { groups } from "../data/groups";
import { users } from "../data/users";
import { expenses } from "../data/expenses";

export function getAllExpenses() {
  return expenses;
}

export function getExpense(id: number) {
  const expense = expenses.find((expense) => expense.id === id);

  return expense;
}

export function addExpense(
  groupId: number,
  description: string,
  amount: number,
  paidBy: number,
  participantIds: number[],
) {
  for (const id of participantIds) {
    const index = users.findIndex((user) => user.id === id);

    if (index === -1) {
      return {
        success: false,
        reason: "user",
        invalidUserId: id,
      };
    }
  }

  const id = groupId;
  const index = groups.findIndex((group) => group.id === id);

  if (index === -1) {
    return {
      success: false,
      reason: "group",
      invalidGroupId: id,
    };
  }

  const newExpense = {
    id: expenses.length + 1,
    groupId,
    description,
    amount,
    paidBy,
    participantIds,
  };

  expenses.push(newExpense);

  return {
    success: true,
    reason: "",
    expense: newExpense,
  };
}

export function deleteExpense(id: number) {
  const index = expenses.findIndex((expense) => expense.id === id);

  if (index === -1) {
    return null;
  }

  return expenses.splice(index, 1)[0];
}
