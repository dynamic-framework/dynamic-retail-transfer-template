import { ApiContact, ApiResponsePaginatedWrapped } from '../api-interface';
import apiClient from '../clients/apiClient';
import contactMapper from '../mappers/contactMapper';

import { RepositoryParams } from './repository';

export async function list(
  params: RepositoryParams<{
    query?: string;
  }>,
) {
  const { data } = await apiClient.request<ApiResponsePaginatedWrapped<ApiContact>>({
    url: '/account-holder/contacts/deposit-accounts',
    method: 'GET',
    signal: params.config?.abortSignal,
    params: {
      ...params.query && { query: params.query },
    },
  });

  return data.content.map(contactMapper);
}
