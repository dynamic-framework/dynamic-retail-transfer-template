import { DIcon } from '@dynamic-framework/ui-react';
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
    <div className="border-bottom border-gray-50 py-1">
      <button
        type="button"
        onClick={handleSelectContact}
        className={classNames(
          'd-flex gap-2 align-items-center justify-content-between w-100 p-2',
          'border-0 text-start rounded-2 bg-transparent hover:bg-primary-25 quick-action-button',
        )}
      >
        <div className="d-flex gap-4 align-items-center">
          <DIcon
            className={`text-yellow-500 ${contact.isFavorite ? 'fill-yellow-500' : ''}`}
            icon={contact.isFavorite ? 'Star' : 'Star'}
          />
          <div className="flex-1">
            <p className="mb-0 fw-bold">{contact.name}</p>
            <small className="text-gray-500">
              {`${contact.bank} - ${contact.accountNumber}`}
            </small>
          </div>
        </div>
        <DIcon
          className="ms-auto"
          color="primary"
          icon="ChevronRight"
        />
      </button>
    </div>
  );
}
