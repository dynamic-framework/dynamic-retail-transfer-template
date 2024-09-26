import { DAvatar, DButtonIcon } from '@dynamic-framework/ui-react';
import classNames from 'classnames';
import { useCallback } from 'react';

import type { Contact } from '../services/interface';
import { useAppDispatch } from '../store/hooks';
import { setSelectedContact } from '../store/slice';
import { getInitials } from '../utils/getInitials';

type Props = {
  contact: Contact;
};

export default function ContactListItem({ contact }: Props) {
  const dispatch = useAppDispatch();

  const handleSelectContact = useCallback(() => {
    dispatch(setSelectedContact(contact));
  }, [contact, dispatch]);

  return (
    <button
      type="button"
      className={classNames(
        'd-flex gap-2 align-items-center justify-content-between w-100 p-2',
        ' border-0 text-start border-bottom border-gray-100 quick-action-button',
      )}
      onClick={handleSelectContact}
    >
      <div className="d-flex gap-2 align-items-center">
        <DAvatar title={getInitials(contact.name)} />
        <div>
          <p className="mb-0 fw-bold">{contact.name}</p>
          <small className="text-gray-500">{contact.accountNumber}</small>
        </div>
      </div>
      <DButtonIcon
        theme="secondary"
        size="lg"
        variant="link"
        icon={contact.isFavorite ? 'star-fill' : 'star'}
      />
    </button>
  );
}
