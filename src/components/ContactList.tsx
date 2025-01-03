import { useTranslation } from 'react-i18next';

import useContacts from '../services/hooks/useContactsEffect';
import { useAppSelector } from '../store/hooks';
import { getContactsQuery } from '../store/selectors';

import ContactListItem from './ContactListItem';
import LoaderList from './loaders/LoaderList';

export default function ContactList() {
  const { t } = useTranslation();

  const contactQuery = useAppSelector(getContactsQuery);

  const {
    loading,
    favoriteContacts,
    regularContacts,
  } = useContacts();

  if (loading) {
    return <LoaderList />;
  }

  const emptyFavoritesText = contactQuery
    ? t('contactList.noMatch')
    : t('contactList.emptyFavorites');

  const emptyRegularsText = contactQuery
    ? t('contactList.noMatch')
    : t('contactList.emptyRegulars');

  return (
    <>
      <div className="d-flex flex-column favorite-contacts">
        <p className="px-4 py-2 fw-bold fs-6 text-gray-500 mb-0">{t('contactList.favorites')}</p>
        {favoriteContacts.map((contact) => (
          <ContactListItem
            contact={contact}
            key={contact.id}
          />
        ))}
        {!favoriteContacts.length && (
          <small className="text-center">
            {emptyFavoritesText}
          </small>
        )}
      </div>
      <div className="d-flex flex-column contacts mt-4">
        <p className="px-4 py-2 fw-bold fs-6 text-gray-500 mb-0">{t('contactList.others')}</p>
        {regularContacts.map((contact) => (
          <ContactListItem
            contact={contact}
            key={contact.id}
          />
        ))}
        {!regularContacts.length && (
          <small className="text-center mb-4">
            {emptyRegularsText}
          </small>
        )}
      </div>
    </>
  );
}
