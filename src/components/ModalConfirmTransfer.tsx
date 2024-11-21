/* eslint-disable react/jsx-props-no-spreading */
import {
  useFormatCurrency,
  useDPortalContext,
  DAlert,
} from '@dynamic-framework/ui-react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import useTransfer from '../services/hooks/useTransfer';
import { useAppSelector } from '../store/hooks';
import {
  getOriginAccount,
  getAmountUsed,
  getSelectedContact,
  getSelectedAccount,
  getScheduledTransfer,
} from '../store/selectors';

import OtpModal from './Otp/OtpModal';

export default function ModalConfirmTransfer() {
  const { t } = useTranslation();
  const { closePortal } = useDPortalContext();

  const amountUsed = useAppSelector(getAmountUsed);
  const selectedContact = useAppSelector(getSelectedContact);
  const selectedAccount = useAppSelector(getSelectedAccount);
  const originAccount = useAppSelector(getOriginAccount);
  const scheduledAt = useAppSelector(getScheduledTransfer);

  const { values: [amountUsedFormatted] } = useFormatCurrency(amountUsed, 0.12);
  const { callback: transfer, loading } = useTransfer();

  const handleTransfer = useCallback(async () => {
    if (!originAccount) {
      return;
    }

    if (selectedContact) {
      await transfer(
        {
          toAccountId: selectedContact.id,
          fromAccountId: originAccount.id,
          amount: amountUsed,
          scheduledAt,
        },
      );
    }

    if (selectedAccount) {
      await transfer(
        {
          toAccountId: selectedAccount.id,
          fromAccountId: originAccount.id,
          amount: amountUsed,
          scheduledAt,
        },
      );
    }

    closePortal();
  }, [amountUsed,
    closePortal,
    originAccount,
    selectedAccount,
    selectedContact,
    scheduledAt,
    transfer,
  ]);

  return (
    <OtpModal
      action={handleTransfer}
      isLoading={loading}
      title={t('modal.transfer.title', { amount: amountUsedFormatted })}
    >
      <DAlert theme="info">
        {t('modal.transfer.text', {
          name: selectedContact?.name || selectedAccount?.name,
          bank: selectedContact?.bank || selectedAccount?.type,
          mask: selectedContact?.accountNumber.slice(-3)
            || selectedAccount?.accountNumber.slice(-3),
          accountFrom: `${originAccount?.name || ''} ${originAccount?.accountNumber.slice(-3) || '***'}`,
        })}
      </DAlert>
    </OtpModal>
  );
}
