import { useEffect, useState } from 'react';

import { ContactRepository } from '@modyo-dynamic/modyo-service-retail';

import { useAppDispatch, useAppSelector } from '../store/hooks';

import { getFavoriteContacts, getRegularContacts } from '../store/selectors';
import { setContacts, setSelectedContact } from '../store/slice';
import errorHandler from '../utils/errorHandler';

export default function useContacts() {
  const [loading, setLoading] = useState(false);
  const favoriteContacts = useAppSelector(getFavoriteContacts);
  const regularContacts = useAppSelector(getRegularContacts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const {
      perform,
      abort,
    } = ContactRepository.list();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      setLoading(true);
      try {
        const data = await perform();
        dispatch(setContacts(data));
        const urlParams = new URLSearchParams(window.location.search);
        const contactId = urlParams.get('contact_id');
        if (contactId) {
          const selectedContact = data.find(({ id }) => contactId === id);
          dispatch(setSelectedContact(selectedContact));
        }
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
    favoriteContacts,
    regularContacts,
  };
}
