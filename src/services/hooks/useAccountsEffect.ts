import { getQueryString } from '@dynamic-framework/ui-react';
import { useEffect } from 'react';

import { useAppDispatch } from '../../store/hooks';
import { setOriginAccount, setIsLoadingAccounts, setAccounts } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';
import { AccountRepository } from '../repositories';
import ApiError from '../utils/ApiError';

export default function useAccountsEffect() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      dispatch(setIsLoadingAccounts(true));
      try {
        const data = await AccountRepository.list({ abortSignal: abortController.signal });
        const accountQueryId = getQueryString('from_account');
        const originAccount = data.find(({ id }) => accountQueryId === id);
        const origin = accountQueryId && originAccount ? originAccount : undefined;
        dispatch(setOriginAccount(origin));
        dispatch(setAccounts(data.filter(({ id }) => id !== origin?.id)));
        dispatch(setIsLoadingAccounts(false));
      } catch (error) {
        if ((error as ApiError).name === 'CanceledError') return;

        errorHandler(error);
      }
    })();

    return () => {
      abortController.abort();
    };
  }, [dispatch]);
}
