import ApiClient from '../clients/apiClient';
import type { Contact } from '../interface';
import contactMapper from '../mappers/contactMapper';

import { RepositoryParams } from './repository';

export async function list(params: RepositoryParams) {
  const { data } = await ApiClient.request<Array<Contact>>({
    url: 'contacts',
    method: 'GET',
    signal: params.config?.abortSignal,
    headers: {
      Prefer: 'code=200, example=All',
    },
  });

  return data.map((apiContact) => contactMapper(apiContact));
}
