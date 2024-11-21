/* eslint-disable react/jsx-props-no-spreading */
import {
  DModal,
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

import Otp from './Otp/components/Otp';

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
    <DModal
      name="modalConfirmPayment"
      centered
      staticBackdrop
    >
      <DModal.Header
        showCloseButton
        onClose={closePortal}
      >
        <h4 className="fw-bold">
          {t('modal.transfer.title', { amount: amountUsedFormatted })}
        </h4>
      </DModal.Header>
      <DModal.Body>
        <div className="bg-gray-soft p-4 rounded-1">
          <Otp
            isLoading={loading}
            action={handleTransfer}
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
          </Otp>
        </div>
      </DModal.Body>
    </DModal>
  );
}
