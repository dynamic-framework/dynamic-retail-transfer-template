import type { ApiContact } from '../api-interface';
import type { Contact } from '../interface';

export default function contactMapper(apiContact: ApiContact): Contact {
  return {
    id: apiContact.id,
    name: apiContact.account_holder_name,
    bank: apiContact.account.bank,
    accountNumber: apiContact.account.account_number.masked_number,
    isFavorite: apiContact.is_favorite,
  };
}
