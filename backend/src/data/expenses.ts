import { Expense } from "../models/expense";

export const expenses: Expense[] = [
  {
    id: 1,
    groupId: 1,
    description: "Dinner",
    amount: 90,
    paidBy: 1,
    participantIds: [1, 2, 3],
  },
];
