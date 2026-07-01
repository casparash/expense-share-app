export interface Expense {
  id: number;
  groupId: number;
  description: string;
  amount: number;
  paidBy: number;
  participantIds: number[];
}
