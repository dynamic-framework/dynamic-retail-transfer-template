import { useTranslation } from 'react-i18next';

import useContacts from '../services/hooks/useContactsEffect';
import ContactListItem from './ContactListItem';
import SkeletonList from './SkeletonList';

export default function ContactList() {
  const { t } = useTranslation();

  const {
    loading,
    favoriteContacts,
    regularContacts,
  } = useContacts();

  if (loading) {
    return <SkeletonList />;
  }
  return (
    <>
      <div className="d-flex flex-column favorite-contacts">
        <p className="px-4 py-2 fw-bold fs-6 text-gray-500 mb-0">{t('contactList.favorites')}</p>
        {favoriteContacts.map((contact) => (
          <ContactListItem contact={contact} key={contact.id} />
        ))}
        {!favoriteContacts.length && (
          <small className="text-center">
            {t('contactList.emptyFavorites')}
          </small>
        )}
      </div>
      <div className="d-flex flex-column contacts">
        <p className="px-4 py-2 fw-bold fs-6 text-gray-500 mb-0">{t('contactList.others')}</p>
        {regularContacts.map((contact) => (
          <ContactListItem contact={contact} key={contact.id} />
        ))}
        {!regularContacts.length && (
          <small className="text-center mb-4">
            {t('contactList.emptyRegulars')}
          </small>
        )}
      </div>
    </>
  );
}
