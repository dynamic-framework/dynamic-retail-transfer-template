import type { ApiAccount } from '../api-interface';
import ApiClient from '../clients/apiClient';
import { ApiAccountTypeConfig } from '../config';
import accountMapper from '../mappers/accountMapper';

import { RepositoryParams } from './repository';

export async function list(params: RepositoryParams) {
  const { data } = await ApiClient.request<Array<ApiAccount>>({
    url: 'accounts',
    method: 'GET',
    signal: params.config?.abortSignal,
    headers: {
      Prefer: 'code=200, example="CURRENT_ACCOUNT,REGULAR_SAVINGS"',
    },
  });
  return data
    // we make sure to only use accounts we can handle
    .filter((apiAccount: ApiAccount) => (
      Object.keys(ApiAccountTypeConfig).includes(apiAccount.accountType)
    ))
    // and we transform the account into the type of account that the widge uses
    .map((apiAccount: ApiAccount) => accountMapper(apiAccount));
}
