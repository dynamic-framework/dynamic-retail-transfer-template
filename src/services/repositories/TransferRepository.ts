import ApiClient from '../clients/apiClient';
import { Transaction, Transfer } from '../interface';

import { RepositoryParams } from './repository';

export async function transfer(
  params: RepositoryParams<{
    transferData: Transfer
  }>,
) {
  const { data } = await ApiClient.request<Transaction>({
    url: 'mocks/generics',
    method: 'POST',
    data: params.transferData,
  });

  return data;
}
