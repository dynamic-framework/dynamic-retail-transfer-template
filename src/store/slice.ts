import { getQueryString } from '@dynamic-framework/ui-react';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { Step } from '../config/widgetConfig';
import {
  Bank,
  Contact,
  DepositAccount,
} from '../services/interface';

export type OptionRepeatValue = {
  id: string;
  name: string;
  value?: number | string;
};

export type OptionRepeat = Record<OptionRepeatValue['id'], OptionRepeatValue>;

export type StartRepeat = {
  enabled: boolean;
  frequency: string | null;
  option: OptionRepeat;
};

export type EndRepeat = {
  enabled: boolean;
  frequency: string | null;
  option: OptionRepeat;
};

export type WidgetState = {
  currentStep: Step;
  accounts: Array<DepositAccount>;
  contacts: Array<Contact>;
  contactsQuery: string;
  selectedAccount?: DepositAccount;
  originAccount?: DepositAccount;
  selectedContact?: Contact;
  amountUsed?: number;
  message?: string;
  banks: Array<Bank>;
  isTransferred?: boolean;
  scheduledTransaction?: string;
  isLoadingAccounts: boolean;
};

const initialState = {
  accounts: [],
  contacts: [],
  currentStep: getQueryString('account_id') ? 'details' : 'init',
  contactsQuery: '',
  banks: [],
  isLoadingAccounts: false,
} as WidgetState;

const slice = createSlice({
  name: 'widget',
  initialState,
  reducers: {
    setCurrentStep(state, action: PayloadAction<Step>) {
      state.currentStep = action.payload;
    },
    setAccounts(state, action: PayloadAction<Array<DepositAccount>>) {
      state.accounts = action.payload;
    },
    setOriginAccount(state, action: PayloadAction<DepositAccount | undefined>) {
      state.originAccount = action.payload;
    },
    setContacts(state, action: PayloadAction<Array<Contact>>) {
      state.contacts = action.payload;
    },
    setSelectedContact(state, action: PayloadAction<Contact | undefined>) {
      state.selectedContact = action.payload;
    },
    setSelectedAccount(state, action: PayloadAction<DepositAccount | undefined>) {
      state.selectedAccount = action.payload;
    },
    setAmountUsed(state, action: PayloadAction<number | undefined>) {
      state.amountUsed = action.payload;
    },
    setMessage(state, action: PayloadAction<string | undefined>) {
      state.message = action.payload;
    },
    setContactsQuery(state, action: PayloadAction<string>) {
      state.contactsQuery = action.payload;
    },
    setIsTransferred(state, action: PayloadAction<boolean>) {
      state.isTransferred = action.payload;
    },
    setIsLoadingAccounts(state, action: PayloadAction<boolean>) {
      state.isLoadingAccounts = action.payload;
    },
    setScheduledTransaction(state, action: PayloadAction<string | undefined>) {
      state.scheduledTransaction = action.payload;
    },
  },
});

export const {
  setAccounts,
  setCurrentStep,
  setContacts,
  setContactsQuery,
  setSelectedAccount,
  setOriginAccount,
  setSelectedContact,
  setAmountUsed,
  setMessage,
  setIsTransferred,
  setIsLoadingAccounts,
  setScheduledTransaction,
} = slice.actions;
export default slice.reducer;
