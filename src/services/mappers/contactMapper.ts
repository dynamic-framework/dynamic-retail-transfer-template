import type { ApiContact } from '../api-interface';
import type { Contact } from '../interface';

export default function contactMapper(apiContact: ApiContact): Contact {
  return {
    id: apiContact.id,
    name: apiContact.name,
    image: apiContact.image,
    bank: apiContact.bank,
    accountNumber: apiContact.accountNumber,
    isFavorite: apiContact.isFavorite,
  };
}
