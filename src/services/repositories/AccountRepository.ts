import type { ApiAccount, ApiResponsePaginatedWrapped } from '../api-interface';
import ApiClient from '../clients/apiClient';
import accountMapper from '../mappers/accountMapper';

import { RepositoryParams } from './repository';

export async function list(
  params: RepositoryParams<{
    query?: string;
  }>,
) {
  const { data } = await ApiClient.request<ApiResponsePaginatedWrapped<ApiAccount>>({
    url: 'accounts/DEPOSIT',
    method: 'GET',
    signal: params.config?.abortSignal,
    params: {
      ...params.query && { query: params.query },
    },
  });

  // We transform the account into the type of account that the widget uses
  return {
    content: data.content.map(accountMapper),
  };
}
