import type { ApiAccount } from '../api-interface';
import { AccountBaseType, ApiAccountTypeConfig } from '../config';
import type { DepositAccount } from '../interface';

export default function accountMapper(apiAccount: ApiAccount): DepositAccount {
  return {
    id: apiAccount.id,
    name: apiAccount.account_holder_name,
    accountNumber: apiAccount.masked_number,
    type: ApiAccountTypeConfig[apiAccount.group],
    baseType: apiAccount.type.toLowerCase() as AccountBaseType.Deposit,
    balanceAvailable: apiAccount.deposit?.balance.available.total as number,
  };
}
