import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type {
  Product,
  Transaction,
  Bank,
  Contact,
} from '@modyo-dynamic/modyo-service-retail';
import { TabOption } from '@dynamic-framework/ui-react';
import { t } from 'i18next';

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
  products: Array<Product>;
  contacts: Array<Contact>;
  contactsQuery: string;
  selectedProduct?: Product;
  originProduct?: Product;
  selectedContact?: Contact;
  transferTypes: Array<TabOption>;
  selectedTransferType? : string;
  view: string;
  amountUsed?: number;
  message?: string;
  result?: Transaction;
  isTransferred?: boolean;
  banks: Array<Bank>;
};

const initialState = {
  products: [],
  contacts: [],
  contactsQuery: '',
  selectedProduct: undefined,
  originProduct: undefined,
  selectedContact: undefined,
  view: 'transfer',
  amountUsed: undefined,
  message: undefined,
  transferTypes: [
    { label: t('transferPanel.contact'), tab: 'contact' },
    { label: t('transferPanel.betweenAccounts'), tab: 'products' },
  ],
  result: undefined,
  isTransferred: undefined,
  banks: [],
} as WidgetState;

const slice = createSlice({
  name: 'widget',
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Array<Product>>) {
      state.products = action.payload;
    },
    setOriginProduct(state, action: PayloadAction<Product | undefined>) {
      state.originProduct = action.payload;
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
    setSelectedProduct(state, action: PayloadAction<Product | undefined>) {
      state.selectedProduct = action.payload;
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
    changeContactFavorite(state, action: PayloadAction<string>) {
      const contact = state.contacts.find(({ id }) => id === action.payload);
      if (contact) {
        contact.isFavorite = !contact.isFavorite;
      }
    },
  },
});

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
export const {
  setProducts,
  setContacts,
  setContactsQuery,
  setSelectedProduct,
  setOriginProduct,
  setSelectedContact,
  addContact,
  setView,
  setAmountUsed,
  setMessage,
  setResult,
  setIsTransferred,
  setBanks,
  setSelectedTransferType,
  changeContactFavorite,
} = slice.actions;
export default slice.reducer;
