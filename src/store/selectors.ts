import { createSelector } from '@reduxjs/toolkit';

import { RootState } from './store';
import { Contact } from '../services/interface';
import getAccountValue from '../services/utils/getAccountValue';

const getState = (state: RootState) => state.widget;

export const getAccounts = createSelector(
  getState,
  (widget) => widget.accounts,
);

export const getContacts = createSelector(
  getState,
  (widget) => widget.contacts,
);

export const getView = createSelector(
  getState,
  (widget) => widget.view,
);

export const getSelectedContact = createSelector(
  getState,
  (widget) => widget.selectedContact,
);

export const getSelectedAccount = createSelector(
  getState,
  (widget) => widget.selectedAccount,
);

export const getAmountUsed = createSelector(
  getState,
  (widget) => widget.amountUsed ?? 0,
);

export const getMessage = createSelector(
  getState,
  (widget) => widget.message,
);

export const getOriginAccount = createSelector(
  getState,
  (widget) => widget.originAccount,
);

export const getOriginAccountAmount = createSelector(
  getOriginAccount,
  (account) => (account ? getAccountValue(account) : 0),
);

export const getResult = createSelector(
  getState,
  (widget) => widget.result,
);

export const getIsTransferred = createSelector(
  getState,
  (widget) => widget.isTransferred,
);

export const getBanks = createSelector(
  getState,
  (widget) => widget.banks,
);

export const getContactsQuery = createSelector(
  getState,
  (widget) => widget.contactsQuery,
);

export const getTransferTypes = createSelector(
  getState,
  (widget) => widget.transferTypes,
);

export const getSelectedTransferType = createSelector(
  getState,
  (widget) => widget.selectedTransferType,
);

export const getContactsFiltered = createSelector(
  getContacts,
  getContactsQuery,
  (contacts, contactsQuery) => {
    if (contactsQuery === '') {
      return contacts;
    }

    return contacts.filter(({ name, accountNumber }: Contact) => (
      name.toLowerCase().includes(contactsQuery.toLowerCase())
        || accountNumber.includes(contactsQuery.toLowerCase())
    ));
  },
);

export const getFavoriteContacts = createSelector(
  getContactsFiltered,
  (contacts) => contacts.filter((contact) => contact.isFavorite),
);

export const getRegularContacts = createSelector(
  getContactsFiltered,
  (contacts) => contacts.filter((contact) => !contact.isFavorite),
);

export const getIsLoadingAccounts = createSelector(
  getState,
  (widget) => widget.isLoadingAccounts,
);
