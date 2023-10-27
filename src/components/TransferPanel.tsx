import {
  DInputSearch,
  DQuickActionButton,
  DTabContent,
  DTabs,
} from '@dynamic-framework/ui-react';
import { useTranslation } from 'react-i18next';
import { useCallback, useMemo, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getSelectedTransferType, getTransferTypes } from '../store/selectors';
import {
  setView,
  setContactsQuery,
  setSelectedTransferType,
} from '../store/slice';
import ContactList from './ContactList';
import AccountList from './AccountList';
import useAccountsEffect from '../services/hooks/useAccountsEffect';

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

  const handleCreateContact = useCallback(() => {
    dispatch(setView('newContact'));
  }, [dispatch]);

  const handleTransferSelector = useCallback((option: string) => {
    dispatch(setSelectedTransferType(option));
  }, [dispatch]);

  return (
    <div className="px-3 py-4 rounded shadow-sm bg-white d-flex flex-column gap-3">
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
          <div className="mb-3">
            <DQuickActionButton
              line1={t('transferPanel.newContact')}
              line2={t('transferPanel.newContactHint')}
              representativeIcon="person-add"
              onClick={handleCreateContact}
            />
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
