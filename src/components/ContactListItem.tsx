/* eslint-disable max-len */
import { MQuickActionButton } from '@dynamic-framework/ui-react';

import { useAppDispatch } from '../store/hooks';
import { setSelectedContact } from '../store/slice';
import { Contact } from '../services/interface';

type Props = {
  contact: Contact;
};

export default function ContactListItem({ contact }: Props) {
  const dispatch = useAppDispatch();

  const handleSelectContact = () => {
    dispatch(setSelectedContact(contact));
  };

  return (
    <MQuickActionButton
      line1={contact.name}
      line2={`${contact.bank} ${contact.accountNumber.slice(-3)}`}
      representativeImage={contact.image}
      onClick={handleSelectContact}
      secondaryActionIcon={contact.isFavorite ? 'star-fill' : 'star'}
    />
  );
}
