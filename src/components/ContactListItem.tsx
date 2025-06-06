import { DAvatar, DIcon } from '@dynamic-framework/ui-react';
import classNames from 'classnames';
import { useCallback } from 'react';

import type { Contact } from '../services/interface';
import { useAppDispatch } from '../store/hooks';
import { setCurrentStep, setSelectedContact } from '../store/slice';

type Props = {
  contact: Contact;
};

export default function ContactListItem({ contact }: Props) {
  const dispatch = useAppDispatch();

  const handleSelectContact = useCallback(() => {
    dispatch(setSelectedContact(contact));
    dispatch(setCurrentStep('details'));
  }, [contact, dispatch]);

  return (
    <button
      type="button"
      onClick={handleSelectContact}
      className={classNames(
        'd-flex gap-2 align-items-center justify-content-between w-100 p-2',
        'border-0 text-start border-bottom border-gray-100 quick-action-button',
      )}
    >
      <div className="d-flex gap-2 align-items-center">
        <DAvatar name={contact.name} />
        <div>
          <p className="mb-0 fw-bold">{contact.name}</p>
          <small className="text-gray-500">{contact.accountNumber}</small>
        </div>
      </div>
      <DIcon
        theme="secondary"
        size="lg"
        icon={contact.isFavorite ? 'star-fill' : 'star'}
      />
    </button>
  );
}
