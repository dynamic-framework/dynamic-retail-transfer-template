import {
  DCard,
  DInputSearch,
  DTabs,
} from '@dynamic-framework/ui-react';
import {
  useMemo,
} from 'react';
import { useTranslation } from 'react-i18next';

import useAccountsEffect from '../services/hooks/useAccountsEffect';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getContactsQuery } from '../store/selectors';
import {
  setContactsQuery,
} from '../store/slice';

import AccountList from './AccountList';
import ContactList from './ContactList';
import NewContact from './NewContact';

export default function TransferPanel() {
  useAccountsEffect();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const contactQuery = useAppSelector(getContactsQuery);

  const TRANSFER_TABS = useMemo(() => [
    { label: t('transferPanel.contacts'), tab: 'contacts' },
    { label: t('transferPanel.betweenAccounts'), tab: 'accounts' },
  ], [t]);

  return (
    <DCard>
      <DCard.Body className="d-flex flex-column gap-4">
        <h6 className="px-2 py-1 fw-bold text-gray-500">{t('transferPanel.transferTo')}</h6>
        <DInputSearch
          value={contactQuery}
          id="searchContacts"
          placeholder={t('transferPanel.searchPlaceholder')}
          onChange={(value) => dispatch(setContactsQuery(value))}
        />
        <DTabs
          options={TRANSFER_TABS}
          defaultSelected={TRANSFER_TABS[0].tab}
          className="mb-4"
        >
          <DTabs.Tab tab={TRANSFER_TABS[0].tab}>
            <NewContact />
            <ContactList />
          </DTabs.Tab>
          <DTabs.Tab tab={TRANSFER_TABS[1].tab}>
            <AccountList />
          </DTabs.Tab>
        </DTabs>
      </DCard.Body>
    </DCard>
  );
}
