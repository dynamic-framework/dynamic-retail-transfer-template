export type ApiErrorItem = {
  status: string;
  code: string;
  title: string;
  message_code: string;
  detail: string;
};

export type ApiAccountAccountType = 'SAVINGS' | 'CHECKING' | 'LOAN' | 'CREDIT_CARD';

export type ApiAccountType = 'DEPOSIT' | 'LOAN';

export type ApiMetadata = {
  page: number;
  rows: number;
  total_pages: number;
  total_rows: number;
};

export type ApiResponsePaginatedWrapped<T> = {
  timestamp: string;
  content: T[];
  metadata: ApiMetadata;
};

export type ApiAccount = {
  id: string;
  number: string;
  masked_number: string;
  type: ApiAccountType;
  group: ApiAccountAccountType;
  state: string;
  account_name: string;
  currency: string;
  deposit?: ApiDepositDetails;
  loan?: ApiLoanDetails;
};

export type ApiDepositDetails = {
  balance: {
    available: {
      total: number;
      deposit: number;
      credit_line: number;
      overdraft: number;
    },
    not_available: number;
    total: number;
  },
  interest: {
    rateSettings?: {
      monthly_rate?: number;
      yearly_rate?: number;
      calculation_method?: string;
    },
    accrued_amount: {
      total: number;
      positive: number;
      negative:number;
    }
  },
  settings: {
    maturity_date: string;
    term: {
      count: number;
      term_description: string;
      period: {
        id: string;
        name: string;
        code: string;
      }
    }
  },
  overdraft: {
    expiration_date: string;
    details: {
      amount: number;
      total: number;
      amount_due: number;
      balance: {
        owed: number;
        remaining: number;
      },
      interest: {
        rate_settings: {
          monthly_rate: number;
          yearly_rate: number;
          calculation_method: string;
        },
        interest_accrued: {
          due: number;
          amount: {
            total: number;
            positive: number;
            negative: number;
          },
          in_cycle: number;
          in_arrears: number;
        }
      }
    }
  },
  credit_line: {
    amount: number;
    total: number;
    amount_due: number;
    balance: {
      owed: number;
      remaining: number;
    },
    interest: {
      rate_settings: {
        monthly_rate: number;
        yearly_rate: number;
        calculation_method: string;
      },
      interest_accrued: {
        due: number;
        amount: {
          total: number;
          positive: number;
          negative: number;
        },
        in_cycle: number;
        in_arrears: number;
      }
    }
  }
};

export type ApiLoanDetails = {
  details: {
    amount: number;
    total: number;
    amount_due: number;
    balance: {
      owed: number;
      remaining: number;
    },
    interest: {
      rate_settings: {
        monthly_rate: number;
        yearly_rate: number;
        calculation_method: string;
      },
      interest_accrued: {
        due: number;
        amount: {
          total: number;
          positive: number;
          negative: number;
        },
        in_cycle: number;
        in_arrears: number;
      }
    }
  },
  term: {
    count: number;
    term_description: string;
    period: {
      id: string;
      name: string;
      code: string;
    }
  },
  days_in_arrears: number;
  days_late: number;
  dates: {
    last_paid: string;
    due_since: string;
    next_due: string;
  }
};

export type ApiContact = {
  id: string;
  account_holder_name: string;
  alias: string;
  account_type: ApiAccountAccountType;
  account: {
    account_number: {
      id: string;
      number: string;
      masked_number: string;
    },
    bank: string,
  }
  phone: string;
  is_favorite: boolean;
};
