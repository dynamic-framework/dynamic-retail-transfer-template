/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import { useTranslation } from 'react-i18next';
import {
  DModal,
  DButton,
  useFormatCurrency,
} from '@dynamic-framework/ui-react';
import type { ModalProps } from '@dynamic-framework/ui-react';

import { useAppSelector } from '../store/hooks';
import {
  getOriginAccount,
  getAmountUsed,
  getSelectedContact,
  getSelectedAccount,
} from '../store/selectors';
import useTransfer from '../services/hooks/useTransfer';

export default function ModalConfirmTransfer({ closeModal }: ModalProps) {
  const { t } = useTranslation();
  const amountUsed = useAppSelector(getAmountUsed);
  const selectedContact = useAppSelector(getSelectedContact);
  const selectedAccount = useAppSelector(getSelectedAccount);
  const originAccount = useAppSelector(getOriginAccount);
  const { values: [amountUsedFormatted] } = useFormatCurrency(amountUsed, 0.12);
  const { callback: transfer, loading } = useTransfer();

  const handleTransfer = async () => {
    if (!originAccount) {
      return;
    }
    if (selectedContact) {
      await transfer(
        {
          toAccountId: selectedContact.id,
          fromAccountId: originAccount.id,
          amount: amountUsed,
        },
      );
    }
    if (selectedAccount) {
      await transfer(
        {
          toAccountId: selectedAccount.id,
          fromAccountId: originAccount.id,
          amount: amountUsed,
        },
      );
    }
    closeModal();
  };
  return (
    <DModal
      name="modalConfirmPayment"
      showCloseButton
      isCentered
      isStatic
      innerClass="d-block"
      onEventClose={() => closeModal()}
    >
      <div slot="header">
        <h4 className="fw-bold">
          {t('modal.transfer.title', { amount: amountUsedFormatted })}
        </h4>
      </div>
      <div slot="body">
        <div className="bg-gray-soft mx-4 mb-4 p-3 rounded-1">
          <p>
            {t('modal.transfer.text', {
              name: selectedContact?.name || selectedAccount?.name,
              bank: selectedContact?.bank || selectedAccount?.type,
              mask: selectedContact?.accountNumber.slice(-3) || selectedAccount?.accountNumber.slice(-3),
              accountFrom: `${originAccount?.name || ''} ${originAccount?.accountNumber.slice(-3) || '***'}`,
            })}
          </p>
        </div>
      </div>
      <div slot="footer">
        <DButton
          class="d-grid"
          text={t('button.cancel')}
          theme="secondary"
          variant="outline"
          isPill
          onEventClick={() => closeModal()}
        />
        <DButton
          class="d-grid"
          text={t('button.transfer')}
          theme="primary"
          isPill
          onEventClick={() => handleTransfer()}
          isLoading={loading}
        />
      </div>
    </DModal>
  );
}
