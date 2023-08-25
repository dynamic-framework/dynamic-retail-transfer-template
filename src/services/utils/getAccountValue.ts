/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Account, DepositAccount, LoanAccount } from '../interface';

export default function getAccountValue(account: Account): number {
  if (account.type === 'loan') {
    const newAccount = account as LoanAccount;
    return newAccount.balanceOwed || 0;
  }
  if (account.type === 'credit-card') {
    const newAccount = account as LoanAccount;
    return newAccount.balanceRemaining || 0;
  }
  const newAccount = account as DepositAccount;
  return newAccount.balanceAvailable || 0;
}
