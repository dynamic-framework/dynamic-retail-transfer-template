import type { GenericAbortSignal } from 'axios';

import ApiClient from '../clients/apiClient';
import type { Contact } from '../interface';
import contactMapper from '../mappers/contactMapper';

export async function list(config: { abortSignal: GenericAbortSignal }) {
  const { data } = await ApiClient.request<Array<Contact>>({
    url: 'contacts',
    method: 'GET',
    signal: config.abortSignal,
    headers: {
      Prefer: 'code=200, example=All',
    },
  });

  return data.map((apiContact) => contactMapper(apiContact));
}
