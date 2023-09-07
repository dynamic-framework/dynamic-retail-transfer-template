export enum AccountBaseType {
  Deposit = 'deposit',
  Loan = 'loan',
}

export enum AccountType {
  Saving = 'saving',
  Checking = 'checking',
  CreditCard = 'credit-card',
  Loan = 'loan',
}

export enum ApiAccountType {
  RegularSavings = 'REGULAR_SAVINGS',
  CurrentAccount = 'CURRENT_ACCOUNT',
  Loan = 'LOAN',
  CreditCard = 'CREDIT_CARD',
}

export const AccountTypeConfig = {
  [AccountType.Checking]: {
    name: 'Checking',
    theme: 'orange',
    icon: 'cash-coin',
    apiType: ApiAccountType.CurrentAccount,
  },
  [AccountType.Saving]: {
    name: 'Savings',
    theme: 'blue',
    icon: 'piggy-bank',
    apiType: ApiAccountType.RegularSavings,
  },
  [AccountType.CreditCard]: {
    name: 'Credit Cards',
    theme: 'indigo',
    icon: 'credit-card',
    apiType: ApiAccountType.CreditCard,
  },
  [AccountType.Loan]: {
    name: 'Loans',
    theme: 'yellow',
    icon: 'cash-stack',
    apiType: ApiAccountType.Loan,
  },
};

export const ApiAccountTypeConfig = {
  REGULAR_SAVINGS: AccountType.Saving,
  CURRENT_ACCOUNT: AccountType.Checking,
  LOAN: AccountType.Loan,
  CREDIT_CARD: AccountType.CreditCard,
};

export enum ActivityStatus {
  Completed = 'completed',
  Rejected = 'rejected',
  Failed = 'failed',
  InProgress = 'in_progress',
}
