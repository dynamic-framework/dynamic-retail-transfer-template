import type { GenericAbortSignal } from 'axios';

import ApiClient from '../clients/apiClient';
import { Bank } from '../interface';

export async function list(config: { abortSignal: GenericAbortSignal }) {
  const { data } = await ApiClient.request<Array<Bank>>({
    url: 'banks',
    method: 'GET',
    signal: config.abortSignal,
    headers: {
      Prefer: 'code=200, example=All',
    },
  });

  return data;
}
