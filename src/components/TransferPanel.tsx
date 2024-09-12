import {
  DIcon,
  DInputSearch,
  DTabContent,
  DTabs,
} from '@dynamic-framework/ui-react';
import { useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { NEW_CONTACT_PATH } from '../config/widgetConfig';
import useAccountsEffect from '../services/hooks/useAccountsEffect';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getSelectedTransferType, getTransferTypes } from '../store/selectors';
import {
  setContactsQuery,
  setSelectedTransferType,
} from '../store/slice';

import AccountList from './AccountList';
import ContactList from './ContactList';

export default function TransferPanel() {
  useAccountsEffect();

  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const transferTypes = useAppSelector(getTransferTypes);
  const selectedTransferType = useAppSelector(getSelectedTransferType);
  const [contactSearchQuery, setContactSearchQuery] = useState<string | undefined>(undefined);
  const currentTab = useMemo(
    () => selectedTransferType ?? transferTypes[0].tab,
    [selectedTransferType, transferTypes],
  );

  const handleSearchContact = useCallback((value: string | undefined) => {
    setContactSearchQuery(value);
    dispatch(setContactsQuery(value || ''));
  }, [dispatch]);

  const handleTransferSelector = useCallback((option: string) => {
    dispatch(setSelectedTransferType(option));
  }, [dispatch]);

  return (
    <div className="px-4 py-6 rounded shadow-sm bg-white d-flex flex-column gap-4">
      <h6 className="px-2 py-1 fw-bold text-gray-500">{t('transferPanel.transferTo')}</h6>
      <DInputSearch
        value={contactSearchQuery}
        id="searchContacts"
        placeholder={t('transferPanel.searchPlaceholder')}
        onChange={handleSearchContact}
      />
      <DTabs
        options={transferTypes}
        defaultSelected={currentTab}
        onChange={(type) => handleTransferSelector(type.tab)}
      >
        <DTabContent tab={transferTypes[0].tab}>
          <div className="mb-4">
            <a
              href={NEW_CONTACT_PATH}
              className="d-flex gap-4 border border-gray-100 rounded p-4 text-black new-contact-link"
            >
              <DIcon icon="person-add" size="40px" className="text-secondary-500" />
              <div>
                <strong>{t('transferPanel.newContact')}</strong>
                <small className="text-gray-500 d-block">{t('transferPanel.newContactHint')}</small>
              </div>
            </a>
          </div>
          <ContactList />
        </DTabContent>
        <DTabContent tab={transferTypes[1].tab}>
          <AccountList />
        </DTabContent>
      </DTabs>
    </div>
  );
}
