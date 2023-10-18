import { useCallback } from 'react';
import { DQuickActionButton } from '@dynamic-framework/ui-react';

import { useAppDispatch } from '../store/hooks';
import { setSelectedContact } from '../store/slice';

import type { Contact } from '../services/interface';

type Props = {
  contact: Contact;
};

export default function ContactListItem({ contact }: Props) {
  const dispatch = useAppDispatch();

  const handleSelectContact = useCallback(() => {
    dispatch(setSelectedContact(contact));
  }, [contact, dispatch]);

  return (
    <DQuickActionButton
      line1={contact.name}
      line2={`${contact.bank} ${contact.accountNumber.slice(-3)}`}
      representativeImage={contact.image}
      onClick={handleSelectContact}
      secondaryActionIcon={contact.isFavorite ? 'star-fill' : 'star'}
    />
  );
}
