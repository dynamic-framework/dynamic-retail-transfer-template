export type ApiErrorItem = {
  status: string;
  code: string;
  title: string;
  messageCode: string;
  detail: string;
};

export type ApiAccountAccountType = 'REGULAR_SAVINGS' | 'CURRENT_ACCOUNT' | 'LOAN' | 'CREDIT_CARD';

export type ApiAccountType = 'DEPOSIT' | 'LOAN';

export type ApiAccount = {
  id: string;
  nickName: string;
  accountNumber: string;
  type: ApiAccountType;
  accountType: ApiAccountAccountType;
  accountingBalance: number;
  availableBalance: number;
  currency: string;
  totalCharges: number;
  totalIncomes: number;
  closedAt: string;
  created: string;
  modified: string;
  status: string;
  depositDetails: ApiDepositDetails;
  loanDetails: ApiLoanDetails;
};

export type ApiDepositDetails = {
  balances: {
    total: number;
    available: number;
    unavailable: number;
  }
  overdraft: {
    limit: number;
    total: number;
    available: number;
    expiryDate: string; // ISO8601
  } | null;
  maturityDate: string | null; // ISO8601
  interest: {
    accrued: number;
    accruedNegative: number;
    settings: {
      rateSettings: {
        rate: number | null;
        tiers: number | null;
        terms: string | null;
        source: string | null;
      },
      paymentPoint: string;
      paymentDates: Array<Record<string, unknown>>;
    }
  }
};

export type ApiLoanDetails = {
  amount: number;
  balances: {
    owed: number;
    remaining: number;
  }
  due: number;
  daysInArrears: number;
  daysLate: number;
  installments: number;
  interest: {
    accrued: number;
    accruedInBillingCycle: number;
    accruedFromArrears: number;
    settings: {
      rate: number;
      rates: null;
      type: string;
      source: string;
    };
  };
};

export type ApiContact = {
  id: string;
  name: string;
  accountNumber: string;
  bank: string;
  image: string;
  isFavorite: boolean;
};
