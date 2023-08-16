import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useFormatCurrency } from '@dynamic-framework/ui-react';

import { useAppSelector } from '../store/hooks';
import { getOriginProductAmount } from '../store/selectors';

export default function useAmount() {
  const { t } = useTranslation();
  const originProductAmount = useAppSelector(getOriginProductAmount);
  const { format } = useFormatCurrency();

  const urlParams = new URLSearchParams(window.location.search);
  const amountFromUrl = urlParams.has('amount') ? Number(urlParams.get('amount')) : undefined;

  const [amount, setAmount] = useState<number | undefined>(amountFromUrl);

  const hint = useMemo(() => {
    if (originProductAmount === 0 || !amount) {
      return {
        message: t('hint.available', { amount: format(originProductAmount) }),
        icon: 'info-circle',
      };
    }
    return {
      message: t('hint.withAmount', { amount: format(originProductAmount - (amount ?? 0)) }),
      icon: 'info-circle',
    };
  }, [amount, format, t, originProductAmount]);

  const canTransfer = useMemo(() => {
    if (amount === 0 || amount === undefined) {
      return false;
    }
    return amount <= originProductAmount;
  }, [amount, originProductAmount]);

  return {
    hint,
    originProductAmount,
    amount,
    setAmount,
    canTransfer,
  };
}
