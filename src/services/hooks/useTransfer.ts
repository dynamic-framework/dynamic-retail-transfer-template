import { useCallback, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  getAmountUsed,
  getOriginAccount,
  getScheduledTransfer,
  getSelectedAccount,
  getSelectedContact,
} from '../../store/selectors';
import { setCurrentStep, setIsTransferred } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';
import { TransferRepository } from '../repositories';

export default function useTransfer() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const originAccount = useAppSelector(getOriginAccount);
  const amountUsed = useAppSelector(getAmountUsed);
  const scheduledAt = useAppSelector(getScheduledTransfer);
  const selectedContact = useAppSelector(getSelectedContact);
  const selectedAccount = useAppSelector(getSelectedAccount);

  const callback = useCallback(async () => {
    if (!originAccount) {
      return;
    }
    setLoading(true);
    try {
      await TransferRepository.transfer({
        transferData: {
          toAccountId: selectedContact?.id || selectedAccount?.id,
          fromAccountId: originAccount.id,
          amount: amountUsed,
          scheduledAt,
        },
      });
      dispatch(setIsTransferred(true));
      dispatch(setCurrentStep('voucher'));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      errorHandler(error);
      throw error;
    }
  }, [
    dispatch,
    amountUsed,
    originAccount,
    scheduledAt,
    selectedAccount,
    selectedContact,
  ]);

  return {
    loading,
    callback,
  };
}
