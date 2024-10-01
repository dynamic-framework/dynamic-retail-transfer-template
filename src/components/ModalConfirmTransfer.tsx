/* eslint-disable react/jsx-props-no-spreading */
import {
  DModal,
  DModalHeader,
  DModalBody,
  DModalFooter,
  DButton,
  useFormatCurrency,
  useDPortalContext,
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
} from '../store/selectors';

export default function ModalConfirmTransfer() {
  const { t } = useTranslation();
  const { closePortal } = useDPortalContext();
  const amountUsed = useAppSelector(getAmountUsed);
  const selectedContact = useAppSelector(getSelectedContact);
  const selectedAccount = useAppSelector(getSelectedAccount);
  const originAccount = useAppSelector(getOriginAccount);
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
    closePortal();
  }, [amountUsed, closePortal, originAccount, selectedAccount, selectedContact, transfer]);

  return (
    <DModal
      name="modalConfirmPayment"
      centered
      staticBackdrop
      className="d-block"
    >
      <DModalHeader
        showCloseButton
        onClose={closePortal}
      >
        <h4 className="fw-bold">
          {t('modal.transfer.title', { amount: amountUsedFormatted })}
        </h4>
      </DModalHeader>
      <DModalBody>
        <div className="bg-gray-soft p-4 rounded-1">
          <p className="mb-0">
            {t('modal.transfer.text', {
              name: selectedContact?.name || selectedAccount?.name,
              bank: selectedContact?.bank || selectedAccount?.type,
              mask: selectedContact?.accountNumber.slice(-3)
                || selectedAccount?.accountNumber.slice(-3),
              accountFrom: `${originAccount?.name || ''} ${originAccount?.accountNumber.slice(-3) || '***'}`,
            })}
          </p>
        </div>
      </DModalBody>
      <DModalFooter>
        <DButton
          className="d-grid"
          text={t('button.cancel')}
          theme="secondary"
          variant="outline"
          onClick={closePortal}
        />
        <DButton
          className="d-grid"
          text={t('button.transfer')}
          theme="primary"
          onClick={() => handleTransfer()}
          loading={loading}
        />
      </DModalFooter>
    </DModal>
  );
}
