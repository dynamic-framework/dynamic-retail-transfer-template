import { createDraftSafeSelector } from '@reduxjs/toolkit';

import { RootState } from './store';
import { Contact } from '../services/interface';
import getAccountValue from '../services/utils/getAccountValue';

const getState = (state: RootState) => state.widget;

export const getAccounts = createDraftSafeSelector(
  getState,
  (widget) => widget.accounts,
);

export const getContacts = createDraftSafeSelector(
  getState,
  (widget) => widget.contacts,
);

export const getView = createDraftSafeSelector(
  getState,
  (widget) => widget.view,
);

export const getSelectedContact = createDraftSafeSelector(
  getState,
  (widget) => widget.selectedContact,
);

export const getSelectedAccount = createDraftSafeSelector(
  getState,
  (widget) => widget.selectedAccount,
);

export const getAmountUsed = createDraftSafeSelector(
  getState,
  (widget) => widget.amountUsed ?? 0,
);

export const getMessage = createDraftSafeSelector(
  getState,
  (widget) => widget.message,
);

export const getOriginAccount = createDraftSafeSelector(
  getState,
  (widget) => widget.originAccount,
);

export const getOriginAccountAmount = createDraftSafeSelector(
  getOriginAccount,
  (account) => (account ? getAccountValue(account) : 0),
);

export const getResult = createDraftSafeSelector(
  getState,
  (widget) => widget.result,
);

export const getIsTransferred = createDraftSafeSelector(
  getState,
  (widget) => widget.isTransferred,
);

export const getBanks = createDraftSafeSelector(
  getState,
  (widget) => widget.banks,
);

export const getContactsQuery = createDraftSafeSelector(
  getState,
  (widget) => widget.contactsQuery,
);

export const getTransferTypes = createDraftSafeSelector(
  getState,
  (widget) => widget.transferTypes,
);

export const getSelectedTransferType = createDraftSafeSelector(
  getState,
  (widget) => widget.selectedTransferType,
);

export const getContactsFiltered = createDraftSafeSelector(
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

export const getFavoriteContacts = createDraftSafeSelector(
  getContactsFiltered,
  (contacts) => contacts.filter((contact) => contact.isFavorite),
);

export const getRegularContacts = createDraftSafeSelector(
  getContactsFiltered,
  (contacts) => contacts.filter((contact) => !contact.isFavorite),
);

export const getIsLoadingAccounts = createDraftSafeSelector(
  getState,
  (widget) => widget.isLoadingAccounts,
);
