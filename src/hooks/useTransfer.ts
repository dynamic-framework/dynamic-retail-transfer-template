import { useCallback, useState } from 'react';

import { TransferRepository } from '@modyo-dynamic/modyo-service-retail';
import type { Transfer } from '@modyo-dynamic/modyo-service-retail';

import { useAppDispatch } from '../store/hooks';
import { setIsTransferred, setResult } from '../store/slice';
import errorHandler from '../utils/errorHandler';

export default function useTransfer() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const callback = useCallback(async (transfer: Transfer) => {
    setLoading(true);
    const { perform } = TransferRepository.create(transfer);
    try {
      const data = await perform();
      dispatch(setResult(data));
      dispatch(setIsTransferred(true));
      setLoading(false);
      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLoading(false);
      errorHandler(error);
      throw error;
    }
  }, [dispatch]);

  return {
    loading,
    callback,
  };
}
