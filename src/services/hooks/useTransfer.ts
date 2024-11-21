import { useCallback, useState } from 'react';

import { useAppDispatch } from '../../store/hooks';
import { setCurrentView, setResult } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';
import { Transfer } from '../interface';
import { TransferRepository } from '../repositories';

export default function useTransfer() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const callback = useCallback(async (transfer: Transfer) => {
    const abortController = new AbortController();
    setLoading(true);
    try {
      const result = await TransferRepository.transfer({
        transferItem: transfer,
        config: { abortSignal: abortController.signal },
      });
      dispatch(setResult(result));
      dispatch(setCurrentView('voucher'));
      setLoading(false);
    } catch (error) {
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
