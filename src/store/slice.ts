import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { View } from '../config/widgetConfig';
import {
  Account,
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

export type WidgetState = {
  currentView: View;
  accounts: Array<Account>;
  contacts: Array<Contact>;
  contactsQuery: string;
  selectedAccount?: Account;
  originAccount?: Account;
  selectedContact?: Contact;
  transferTypes: Array<DTabOption>;
  selectedTransferType? : string;
  view: string;
  amountUsed?: number;
  message?: string;
  result?: Transaction;
  isLoadingAccounts: boolean;
};

const initialState = {
  accounts: [],
  contacts: [],
  currentView: 'init',
  contactsQuery: '',
  view: 'transfer',
  banks: [],

  isLoadingAccounts: false,
} as WidgetState;

const slice = createSlice({
  name: 'widget',
  initialState,
  reducers: {
    setCurrentView(state, action: PayloadAction<View>) {
      state.currentView = action.payload;
    },
    setAccounts(state, action: PayloadAction<Array<Account>>) {
      state.accounts = action.payload;
    },
    setOriginAccount(state, action: PayloadAction<Account | undefined>) {
      state.originAccount = action.payload;
    },
    setContacts(state, action: PayloadAction<Array<Contact>>) {
      state.contacts = action.payload;
    },
    setSelectedContact(state, action: PayloadAction<Contact | undefined>) {
      state.selectedContact = action.payload;
    },
    setSelectedAccount(state, action: PayloadAction<Account | undefined>) {
      state.selectedAccount = action.payload;
    },
    setView(state, action: PayloadAction<string>) {
      state.view = action.payload;
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
    setContactsQuery(state, action: PayloadAction<string>) {
      state.contactsQuery = action.payload;
    },
    setIsLoadingAccounts(state, action: PayloadAction<boolean>) {
      state.isLoadingAccounts = action.payload;
    },
    setScheduledTransaction(state, action: PayloadAction<Date | null>) {
      state.scheduledTransaction = action.payload;
    },
  },
});

export const {
  setAccounts,
  setCurrentView,
  setContacts,
  setContactsQuery,
  setSelectedAccount,
  setOriginAccount,
  setSelectedContact,
  setView,
  setAmountUsed,
  setMessage,
  setResult,
  setIsLoadingAccounts,
} = slice.actions;
export default slice.reducer;
