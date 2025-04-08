import {
  changeQueryString,
  DCard,
  DTabs,
} from '@dynamic-framework/ui-react';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import useAccountsEffect from '../services/hooks/useAccountsEffect';

import AccountList from './AccountList';
import ContactList from './ContactList';
import NewContact from './NewContact';

export default function TransferPanel() {
  useAccountsEffect();
  const { t } = useTranslation();

  const TRANSFER_TABS = useMemo(() => [
    { label: t('transferPanel.contacts'), tab: 'contacts' },
    { label: t('transferPanel.betweenAccounts'), tab: 'accounts' },
  ], [t]);

  return (
    <DCard>
      <DCard.Body className="d-flex flex-column gap-4">
        <DTabs
          options={TRANSFER_TABS}
          defaultSelected={TRANSFER_TABS[0].tab}
          className="mb-4 px-0"
          onChange={() => {
            changeQueryString(
              { query: '' },
              { pushState: true, useSearch: true },
            );
          }}
        >
          <DTabs.Tab
            tab={TRANSFER_TABS[0].tab}
            className="d-flex flex-column gap-6"
          >
            <NewContact />
            <ContactList />
          </DTabs.Tab>
          <DTabs.Tab
            tab={TRANSFER_TABS[1].tab}
            className="d-flex flex-column gap-6"
          >
            <AccountList />
          </DTabs.Tab>
        </DTabs>
      </DCard.Body>
    </DCard>
  );
}
