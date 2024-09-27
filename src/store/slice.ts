import { DTabOption } from '@dynamic-framework/ui-react';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { t } from 'i18next';

import {
  Account,
  Bank,
  Contact,
  Transaction,
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
// eslint-disable-next-line @typescript-eslint/ban-types
export type WidgetState = {
  accounts: Array<Account>;
  contacts: Array<Contact>;
  contactsQuery: string;
  selectedAccount?: Account;
  originAccount?: Account;
  selectedContact?: Contact;
  transferTypes: Array<DTabOption>;
  selectedTransferType? : string;
  amountUsed?: number;
  message?: string;
  result?: Transaction;
  isTransferred?: boolean;
  banks: Array<Bank>;
  scheduledTransaction: Date | null;

  isLoadingAccounts: boolean;
};

const initialState = {
  accounts: [],
  contacts: [],
  contactsQuery: '',
  scheduledTransaction: null,
  transferTypes: [
    { label: t('transferPanel.contact'), tab: 'contact' },
    { label: t('transferPanel.betweenAccounts'), tab: 'accounts' },
  ],
  banks: [],

  isLoadingAccounts: false,
} as WidgetState;

const slice = createSlice({
  name: 'widget',
  initialState,
  reducers: {
    setAccounts(state, action: PayloadAction<Array<Account>>) {
      state.accounts = action.payload;
    },
    setOriginAccount(state, action: PayloadAction<Account | undefined>) {
      state.originAccount = action.payload;
    },
    setContacts(state, action: PayloadAction<Array<Contact>>) {
      state.contacts = action.payload;
    },
    addContact(state, action: PayloadAction<Contact>) {
      state.contacts.push(action.payload);
    },
    setSelectedContact(state, action: PayloadAction<Contact | undefined>) {
      state.selectedContact = action.payload;
    },
    setSelectedAccount(state, action: PayloadAction<Account | undefined>) {
      state.selectedAccount = action.payload;
    },
    setAmountUsed(state, action: PayloadAction<number | undefined>) {
      state.amountUsed = action.payload;
    },
    setMessage(state, action: PayloadAction<string | undefined>) {
      state.message = action.payload;
    },
    setResult(state, action: PayloadAction<Transaction>) {
      state.result = action.payload;
    },
    setIsTransferred(state, action: PayloadAction<boolean>) {
      state.isTransferred = action.payload;
    },
    setBanks(state, action: PayloadAction<Array<Bank>>) {
      state.banks = action.payload;
    },
    setContactsQuery(state, action: PayloadAction<string>) {
      state.contactsQuery = action.payload;
    },
    setSelectedTransferType(state, action: PayloadAction<string>) {
      state.selectedTransferType = action.payload;
    },
    setIsLoadingAccounts(state, action: PayloadAction<boolean>) {
      state.isLoadingAccounts = action.payload;
    },
    setScheduledTransaction(state, action: PayloadAction<Date | null>) {
      state.scheduledTransaction = action.payload;
    },
  },
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const {
  setAccounts,
  setContacts,
  setContactsQuery,
  setSelectedAccount,
  setOriginAccount,
  setSelectedContact,
  addContact,
  setAmountUsed,
  setMessage,
  setResult,
  setIsTransferred,
  setBanks,
  setSelectedTransferType,
  setIsLoadingAccounts,
  setScheduledTransaction,
} = slice.actions;
export default slice.reducer;
