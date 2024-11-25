import { createSelector } from '@reduxjs/toolkit';

import { Contact } from '../services/interface';

import { RootState } from './store';

const getState = (state: RootState) => state.widget;

export const getAccounts = createSelector(
  getState,
  (widget) => widget.accounts,
);

export const getCurrentStep = createSelector(
  getState,
  (widget) => widget.currentStep,
);

export const getContacts = createSelector(
  getState,
  (widget) => widget.contacts,
);

export const getSelectedContact = createSelector(
  getState,
  (widget) => widget.selectedContact,
);

export const getSelectedAccount = createSelector(
  getState,
  (widget) => widget.selectedAccount,
);

export const getSelectedDestiny = createSelector(
  getSelectedContact,
  getSelectedAccount,
  (selectedContact, selectedAccount) => selectedContact || selectedAccount,
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
  (account) => account?.balanceAvailable || 0,
);

export const getResult = createSelector(
  getState,
  (widget) => widget.result,
);

export const getContactsQuery = createSelector(
  getState,
  (widget) => widget.contactsQuery,
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

export const getScheduledTransfer = createSelector(
  getState,
  (widget) => widget.scheduledTransaction,
);
