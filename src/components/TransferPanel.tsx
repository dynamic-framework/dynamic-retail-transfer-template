import {
  MInputSearch,
  MQuickActionButton,
  MTabContent,
  MTabs,
} from '@dynamic-framework/ui-react';

import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getSelectedTransferType, getTransferTypes } from '../store/selectors';
import { setView, setContactsQuery, setSelectedTransferType } from '../store/slice';
import ContactList from './ContactList';
import ProductList from './ProductList';

export default function TransferPanel() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const transferTypes = useAppSelector(getTransferTypes);
  const selectedTransferType = useAppSelector(getSelectedTransferType);
  const currentTab = useMemo(
    () => selectedTransferType ?? transferTypes[0].tab,
    [selectedTransferType, transferTypes],
  );

  const handleCreateContact = () => {
    dispatch(setView('newContact'));
  };
  const handleTransferSelector = (option: string) => {
    dispatch(setSelectedTransferType(option));
  };

  return (
    <div className="px-3 py-4 rounded shadow-sm bg-white d-flex flex-column gap-3">
      <h6 className="px-2 py-1 fw-bold text-gray-500">{t('transferPanel.transferTo')}</h6>
      <MInputSearch
        mId="searchContacts"
        placeholder={t('transferPanel.searchPlaceholder')}
        onMChange={({ detail }) => dispatch(setContactsQuery(detail))}
      />
      <MTabs
        options={transferTypes}
        defaultSelected={currentTab}
        onChange={(type) => handleTransferSelector(type.tab)}
      >
        <MTabContent tab={transferTypes[0].tab}>
          <div className="mb-3">
            <MQuickActionButton
              line1={t('transferPanel.newContact')}
              line2={t('transferPanel.newContactHint')}
              representativeIcon="person-add"
              onClick={handleCreateContact}
            />
          </div>
          <ContactList />
        </MTabContent>
        <MTabContent tab={transferTypes[1].tab}>
          <ProductList />
        </MTabContent>
      </MTabs>
    </div>
  );
}
