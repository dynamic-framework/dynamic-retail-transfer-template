import {
  changeQueryString,
  DInputSearch,
  getQueryString,
} from '@dynamic-framework/ui-react';
import debounce from 'lodash.debounce';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import useContactsEffect from '../services/hooks/useContactsEffect';

import ContactListItem from './ContactListItem';
import LoaderList from './loaders/LoaderList';

export default function ContactList() {
  const [query, setQuery] = useState(getQueryString('query', { default: '', useSearch: true }));
  const { t } = useTranslation();

  const {
    loading,
    favoriteContacts,
    regularContacts,
  } = useContactsEffect(query);

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
      {loading && (<LoaderList />)}

      {!loading && (
        <>
          <div className="d-flex flex-column favorite-contacts">
            <p className="py-2 fw-bold fs-6 text-gray-500 mb-0">{t('contactList.favorites')}</p>
            {favoriteContacts.map((contact) => (
              <ContactListItem
                contact={contact}
                key={contact.id}
              />
            ))}
            {!favoriteContacts.length && (
            <small className="text-center">
              {t(query ? 'contactList.noMatch' : 'contactList.emptyFavorites')}
            </small>
            )}
          </div>
          <div className="d-flex flex-column contacts">
            <p className="py-2 fw-bold fs-6 text-gray-500 mb-0">{t('contactList.others')}</p>
            {regularContacts.map((contact) => (
              <ContactListItem
                contact={contact}
                key={contact.id}
              />
            ))}
            {!regularContacts.length && (
            <small className="text-center mb-4">
              {t(query ? 'contactList.noMatch' : 'contactList.emptyRegulars')}
            </small>
            )}
          </div>
        </>
      )}
    </>
  );
}
