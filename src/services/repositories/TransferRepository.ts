import type { GenericAbortSignal } from 'axios';

import ApiClient from '../ApiClient';
import { Transaction, Transfer } from '../interface';

export async function transfer(
  transferItem: Transfer,
  config: { abortSignal: GenericAbortSignal },
) {
  const { data } = await ApiClient.request<Transaction>({
    url: 'transfer',
    method: 'POST',
    signal: config.abortSignal,
    headers: {
      Prefer: 'code=200',
    },
    data: transferItem,
  });

  return data;
}
