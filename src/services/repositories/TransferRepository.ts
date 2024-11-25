import ApiClient from '../clients/apiClient';
import { Transaction, Transfer } from '../interface';

import { RepositoryParams } from './repository';

export async function transfer(
  params: RepositoryParams<{
    transferData: Transfer
  }>,
) {
  const { data } = await ApiClient.request<Transaction>({
    url: 'transfer',
    method: 'POST',
    signal: params.config?.abortSignal,
    headers: {
      Prefer: 'code=200',
    },
    data: params.transferData,
  });

  return data;
}
