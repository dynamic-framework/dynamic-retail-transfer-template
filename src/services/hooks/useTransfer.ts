import { useCallback, useState } from 'react';

import { useAppDispatch } from '../../store/hooks';
import { setCurrentStep, setResult } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';
import { Transfer } from '../interface';
import { TransferRepository } from '../repositories';

export default function useTransfer() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const callback = useCallback(async (transfer: Transfer) => {
    setLoading(true);
    try {
      const result = await TransferRepository.transfer({
        transferData: transfer,
      });

      dispatch(setResult(result));
      dispatch(setCurrentStep('voucher'));
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
