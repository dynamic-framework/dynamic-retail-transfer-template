import { useEffect, useState } from 'react';

import { ContactRepository } from '../repositories';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getContacts, getFavoriteContacts, getRegularContacts } from '../../store/selectors';
import { setContacts } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';

export default function useContacts() {
  const [loading, setLoading] = useState(false);
  const data = useAppSelector(getContacts);
  const favoriteContacts = useAppSelector(getFavoriteContacts);
  const regularContacts = useAppSelector(getRegularContacts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      setLoading(true);
      try {
        const response = await ContactRepository.list({ abortSignal: abortController.signal });
        setLoading(false);
        dispatch(setContacts(response));
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
    data,
    favoriteContacts,
    regularContacts,
  };
}
