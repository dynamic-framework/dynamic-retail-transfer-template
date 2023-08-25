import { useCallback, useState } from 'react';
import { useToast } from '@dynamic-framework/ui-react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from '../../store/hooks';
import { addContact } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';
import { Contact } from '../interface';

export default function useCreateContact() {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const callback = useCallback((contact: Exclude<Contact, 'id'>) => {
    try {
      setLoading(true);
      dispatch(addContact(contact));
      setLoading(false);
      toast(t('alert.newContactMessage'), { type: 'success' });
      return contact;
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
