import { useCallback, useState } from 'react';
import { useToast } from '@dynamic-framework/ui-react';
import { useTranslation } from 'react-i18next';

import { ContactRepository } from '@modyo-dynamic/modyo-service-retail';
import type { Contact } from '@modyo-dynamic/modyo-service-retail';

import { useAppDispatch } from '../store/hooks';
import { addContact } from '../store/slice';
import errorHandler from '../utils/errorHandler';

export default function useCreateContact() {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const callback = useCallback(async (contact: Exclude<Contact, 'id'>) => {
    setLoading(true);
    const { perform } = ContactRepository.create(contact);
    try {
      const data = await perform();
      dispatch(addContact(data));
      setLoading(false);
      toast(t('alert.newContactMessage'), { type: 'success' });

      return data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setLoading(false);
      errorHandler(error);
      throw error;
    }
  }, [dispatch, t, toast]);

  return {
    loading,
    callback,
  };
}
