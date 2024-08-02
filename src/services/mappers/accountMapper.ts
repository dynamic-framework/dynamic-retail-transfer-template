import type { ApiAccount } from '../api-interface';
import {
  AccountBaseType,
  ApiAccountTypeConfig,
} from '../config';
import type { Account } from '../interface';

export default function accountMapper(apiAccount: ApiAccount): Account {
  const baseType = apiAccount.type.toLowerCase() as AccountBaseType;

  const commonProps = {
    id: apiAccount.id,
    name: apiAccount.nickName,
    alias: apiAccount.nickName,
    accountNumber: apiAccount.accountNumber,
    type: ApiAccountTypeConfig[apiAccount.accountType],
  };

  if (baseType === AccountBaseType.Loan) {
    return {
      ...commonProps,
      baseType,
      balanceOwed: apiAccount.loanDetails?.balances.owed,
      balanceRemaining: apiAccount.loanDetails?.balances.remaining,
      due: apiAccount.loanDetails?.due,
      installments: apiAccount.loanDetails?.installments,
      interestRate: apiAccount.loanDetails?.interest.settings.rate,
    };
  }

  return {
    ...commonProps,
    baseType,
    balanceAvailable: apiAccount.depositDetails?.balances.available,
    balanceTotal: apiAccount.depositDetails?.balances.total,
    balanceUnavailable: apiAccount.depositDetails?.balances.unavailable,
  };
}
