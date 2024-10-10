import { AccountBaseType, AccountType } from './config';

export type BaseAccount<T extends AccountBaseType> = {
  id: string;
  name: string;
  alias?: string;
  accountNumber: string;
  type: AccountType;
  baseType: T;
};

export type DepositAccount = BaseAccount<AccountBaseType.Deposit> & {
  balanceAvailable?: number;
  balanceTotal?: number;
  balanceUnavailable?: number;
  interestRate?: number;
  overdraftAvailable?: number;
};

export type LoanAccount = BaseAccount<AccountBaseType.Loan> & {
  due?: number;
  amount?: number;
  balanceOwed?: number;
  balanceRemaining?: number;
  paymentNextDueDate?: string;
  paymentDue?: number;
  paymentLastPaidInstallmentNumber?: number;
  installments?: number;
  interestRate?: number;
};

export type Account = DepositAccount | LoanAccount;

export type Transfer = {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  scheduledAt?: string | null;
};

export type Transaction = {
  state: number;
  status: string;
  isTransfered: boolean;
  date: string;
  id: string;
};

export type Bank = {
  id: string;
  name: string;
};

export type Contact = {
  id: string;
  name: string;
  accountNumber: string;
  bank: string;
  image: string;
  isFavorite: boolean;
};
