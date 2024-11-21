import {
  DCard,
  DIcon,
  DInputSearch,
  DTabs,
} from '@dynamic-framework/ui-react';
import {
  useCallback,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import { NEW_CONTACT_PATH, SITE_URL } from '../config/widgetConfig';
import useAccountsEffect from '../services/hooks/useAccountsEffect';
import { useAppDispatch } from '../store/hooks';
import {
  setContactsQuery,
} from '../store/slice';

import AccountList from './AccountList';
import ContactList from './ContactList';

export default function TransferPanel() {
  useAccountsEffect();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const TRANSFER_TABS = useMemo(() => [
    { label: t('transferPanel.contact'), tab: 'contact' },
    { label: t('transferPanel.betweenAccounts'), tab: 'accounts' },
  ], [t]);

  const [contactSearchQuery, setContactSearchQuery] = useState<string | undefined>(undefined);
  const [currentTab, setCurrentTab] = useState(TRANSFER_TABS[0].tab);

  const handleSearchContact = useCallback((value: string | undefined) => {
    setContactSearchQuery(value);
    dispatch(setContactsQuery(value || ''));
  }, [dispatch]);

  return (
    <DCard>
      <DCard.Body>
        <h6 className="px-2 py-1 fw-bold text-gray-500">{t('transferPanel.transferTo')}</h6>
        <DInputSearch
          value={contactSearchQuery}
          id="searchContacts"
          placeholder={t('transferPanel.searchPlaceholder')}
          onChange={handleSearchContact}
        />
        <DTabs
          options={TRANSFER_TABS}
          defaultSelected={currentTab}
          onChange={(type) => setCurrentTab(type.tab)}
        >
          <DTabs.Tab tab={TRANSFER_TABS[0].tab}>
            <div className="my-4">
              <a
                href={`${SITE_URL}/${NEW_CONTACT_PATH}`}
                className="d-flex gap-4 border border-gray-100 rounded p-4 text-black reset-btn"
              >
                <DIcon
                  icon="person-add"
                  size="40px"
                  className="text-secondary-500"
                />
                <div>
                  <strong>{t('transferPanel.newContact')}</strong>
                  <small className="text-gray-500 d-block">{t('transferPanel.newContactHint')}</small>
                </div>
              </a>
            </div>
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
