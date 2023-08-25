import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getBanks } from '../../store/selectors';
import { setBanks } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';
import { BankRepository } from '../repositories';

export default function useBanksEffect() {
  const [loading, setLoading] = useState(false);
  const banks = useAppSelector(getBanks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      setLoading(true);
      try {
        const data = await BankRepository.list({ abortSignal: abortController.signal });
        dispatch(setBanks(data));
        setLoading(false);
      } catch (error) {
        errorHandler(error);
      }
    })();
    return () => {
      abortController.abort();
    };
  }, [dispatch]);

  return {
    loading,
    banks,
  };
}
