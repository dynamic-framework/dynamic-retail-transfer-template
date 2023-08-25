import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useFormatCurrency } from '@dynamic-framework/ui-react';

import { useAppSelector } from '../../store/hooks';
import { getOriginAccountAmount } from '../../store/selectors';
import getAccountAmountQueryString from '../utils/getAccountAmountQueryString';

export default function useAmount() {
  const { t } = useTranslation();
  const { format } = useFormatCurrency();
  const originAccountAmount = useAppSelector(getOriginAccountAmount);

  const amountFromUrl = getAccountAmountQueryString();

  const [amount, setAmount] = useState<number | undefined>(amountFromUrl);

  const hint = useMemo(() => {
    if (originAccountAmount === 0 || !amount) {
      return {
        message: t('hint.available', { amount: format(originAccountAmount) }),
        icon: 'info-circle',
      };
    }
    return {
      message: t('hint.withAmount', { amount: format(originAccountAmount - (amount ?? 0)) }),
      icon: 'info-circle',
    };
  }, [amount, format, t, originAccountAmount]);

  const canTransfer = useMemo(() => {
    if (amount === 0 || amount === undefined) {
      return false;
    }
    return amount <= originAccountAmount;
  }, [amount, originAccountAmount]);

  return {
    hint,
    originAccountAmount,
    amount,
    setAmount,
    canTransfer,
  };
}
