import { createDraftSafeSelector } from '@reduxjs/toolkit';

import { getProductValue } from '@modyo-dynamic/modyo-service-retail';
import type { Contact } from '@modyo-dynamic/modyo-service-retail';

import { RootState } from './store';

const getState = (state: RootState) => state.widget;

export const getProducts = createDraftSafeSelector(
  getState,
  (widget) => widget.products,
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

export const getSelectedProduct = createDraftSafeSelector(
  getState,
  (widget) => widget.selectedProduct,
);

export const getAmountUsed = createDraftSafeSelector(
  getState,
  (widget) => widget.amountUsed ?? 0,
);

export const getMessage = createDraftSafeSelector(
  getState,
  (widget) => widget.message,
);

export const getOriginProduct = createDraftSafeSelector(
  getState,
  (widget) => widget.originProduct,
);

export const getOriginProductAmount = createDraftSafeSelector(
  getOriginProduct,
  (product) => (product ? getProductValue(product) : 0),
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

    return contacts.filter(({ name, productNumber }: Contact) => (
      name.toLowerCase().includes(contactsQuery.toLowerCase())
        || productNumber.includes(contactsQuery.toLowerCase())
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
