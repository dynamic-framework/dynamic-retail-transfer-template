import { AccountBaseType, AccountType } from './config';

export type BaseAccount<T extends AccountBaseType> = {
  id: string;
  name: string;
  accountNumber: string;
  type: AccountType;
  baseType: T;
};

export type DepositAccount = BaseAccount<AccountBaseType.Deposit> & {
  balanceAvailable: number;
};

export type Transfer = {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  scheduledAt?: string;
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
  isFavorite: boolean;
};
