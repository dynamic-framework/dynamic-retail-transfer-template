import { ApiContact } from '../api-interface';
import ApiClient from '../clients/apiClient';
import contactMapper from '../mappers/contactMapper';

import { RepositoryParams } from './repository';

export async function list(params: RepositoryParams) {
  const { data } = await ApiClient.request<ApiContact[]>({
    url: 'contacts',
    method: 'GET',
    signal: params.config?.abortSignal,
    headers: {
      Prefer: 'code=200, example=All',
    },
  });

  return data.map((apiContact) => contactMapper(apiContact));
}
