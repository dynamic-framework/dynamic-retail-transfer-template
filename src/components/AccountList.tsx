import {
  changeQueryString,
  DInputSearch,
  getQueryString,
} from '@dynamic-framework/ui-react';
import debounce from 'lodash.debounce';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import useAccountsEffect from '../services/hooks/useAccountsEffect';
import { useAppSelector } from '../store/hooks';
import { getAccounts, getIsLoadingAccounts } from '../store/selectors';

import AccountListItem from './AccountListItem';
import AccountListLoader from './loaders/AccountListLoader';

export default function AccountList() {
  const [query, setQuery] = useState(getQueryString('query', { default: '', useSearch: true }));
  const isLoadingAccounts = useAppSelector(getIsLoadingAccounts);
  const accountsToTransfer = useAppSelector(getAccounts);
  const { t } = useTranslation();

  useAccountsEffect(query);

  const handleSearch = debounce((value: string) => {
    if (setQuery) {
      setQuery(value);
    }

    changeQueryString({
      query: value,
    }, {
      pushState: true,
      useSearch: true,
    });
  }, 400);

  return (
    <>
      <DInputSearch
        id="searchContacts"
        placeholder={t('transferPanel.searchPlaceholder')}
        defaultValue={query}
        onChange={(value) => handleSearch(value)}
      />
      {isLoadingAccounts && <AccountListLoader />}

      {!isLoadingAccounts && (
        <div className="d-flex flex-column accounts">
          {accountsToTransfer.map((account) => (
            <AccountListItem
              depositAccount={account}
              key={account.id}
            />
          ))}
        </div>
      )}
    </>
  );
}
