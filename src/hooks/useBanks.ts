import { useEffect, useState } from 'react';

import { BankRepository } from '@modyo-dynamic/modyo-service-retail';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getBanks } from '../store/selectors';
import { setBanks } from '../store/slice';
import errorHandler from '../utils/errorHandler';

export default function useBanks() {
  const [loading, setLoading] = useState(false);
  const banks = useAppSelector(getBanks);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const {
      perform,
      abort,
    } = BankRepository.list();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      setLoading(true);
      try {
        const data = await perform();
        dispatch(setBanks(data));
        setLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        errorHandler(error);
      }
    })();
    return () => {
      abort();
    };
  }, [dispatch]);

  return {
    loading,
    banks,
  };
}
