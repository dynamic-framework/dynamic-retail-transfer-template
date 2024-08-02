import { useDToast } from '@dynamic-framework/ui-react';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch } from '../../store/hooks';
import { addContact } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';
import { Contact } from '../interface';

export default function useCreateContact() {
  const { toast } = useDToast();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const callback = useCallback((contact: Exclude<Contact, 'id'>) => {
    try {
      setLoading(true);
      dispatch(addContact(contact));
      setLoading(false);
      toast(
        {
          title: t('alert.newContactMessage'),
          theme: 'success',
        },
        { duration: 5000 },
      );
      return contact;
    } catch (error) {
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
