import { useCallback, useState } from 'react';

import { useAppDispatch } from '../../store/hooks';
import { setIsTransferred, setResult } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';
import { TransferRepository } from '../repositories';
import { Transfer } from '../interface';

export default function useTransfer() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const callback = useCallback(async (transfer: Transfer) => {
    const abortController = new AbortController();
    setLoading(true);
    try {
      const result = await TransferRepository.transfer(
        transfer,
        { abortSignal: abortController.signal },
      );
      dispatch(setResult(result));
      dispatch(setIsTransferred(true));
      setLoading(false);

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
