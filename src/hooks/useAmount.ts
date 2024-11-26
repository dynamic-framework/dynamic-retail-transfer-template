import { getQueryString, useFormatCurrency } from '@dynamic-framework/ui-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../store/hooks';
import { getOriginAccount } from '../store/selectors';

export default function useAmount() {
  const { t } = useTranslation();
  const { format } = useFormatCurrency();
  const originAccount = useAppSelector(getOriginAccount);
  const originAmount = originAccount?.balanceAvailable || 0;

  const queryStringAmount = useMemo(() => getQueryString('amount', { default: '0' }), []);
  const [amount, setAmount] = useState<number | undefined>(Number(queryStringAmount));

  const hint = useMemo(() => {
    if (!originAmount || !amount) {
      return {
        message: t('hint.available', { amount: format(originAmount) }),
        icon: 'info-circle',
      };
    }
    return {
      message: t('hint.withAmount', { amount: format(originAmount - (amount)) }),
      icon: 'info-circle',
    };
  }, [amount, format, t, originAmount]);

  const enableTransfer = useMemo(
    () => !amount || amount <= originAmount,
    [amount, originAmount],
  );

  return {
    hint,
    originAmount,
    amount,
    setAmount,
    enableTransfer,
  };
}
