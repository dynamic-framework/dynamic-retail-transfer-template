/* eslint-disable max-len */
/* eslint-disable react/jsx-props-no-spreading */
import { useTranslation } from 'react-i18next';
import { MButton, MModal, useFormatCurrency } from '@dynamic-framework/ui-react';
import type { ModalProps } from '@dynamic-framework/ui-react';

import { useAppSelector } from '../store/hooks';
import {
  getOriginProduct,
  getAmountUsed,
  getSelectedContact,
  getMessage,
  getSelectedProduct,
} from '../store/selectors';
import useTransfer from '../hooks/useTransfer';

export default function ModalConfirmTransfer({ closeModal }: ModalProps) {
  const { t } = useTranslation();
  const amountUsed = useAppSelector(getAmountUsed);
  const selectedContact = useAppSelector(getSelectedContact);
  const selectedProduct = useAppSelector(getSelectedProduct);
  const originProduct = useAppSelector(getOriginProduct);
  const message = useAppSelector(getMessage);
  const { values: [amountUsedFormatted] } = useFormatCurrency(amountUsed, 0.12);
  const { callback: transfer, loading } = useTransfer();

  const handleTransfer = async () => {
    if (!originProduct) {
      return;
    }
    if (selectedContact) {
      await transfer(
        {
          targetId: selectedContact.id,
          targetName: selectedContact.name,
          targetProductNumber: selectedContact.id, // TODO: Revisar typos del ID para contactos
          sourceProductNumber: originProduct.id as string,
          amount: amountUsed,
          message,
        },
      );
    }
    if (selectedProduct) {
      await transfer(
        {
          targetId: `${selectedProduct.id}`,
          targetName: selectedProduct.name,
          targetProductNumber: selectedProduct.id as string,
          sourceProductNumber: originProduct.id as string,
          amount: amountUsed,
          message,
        },
      );
    }
    closeModal();
  };
  return (
    <MModal
      name="modalConfirmPayment"
      showCloseButton
      isCentered
      isStatic
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
              name: selectedContact?.name || selectedProduct?.name,
              bank: selectedContact?.bank || selectedProduct?.type,
              mask: selectedContact?.productNumber.slice(-3) || selectedProduct?.productNumber.slice(-3),
              productFrom: `${originProduct?.name || ''} ${originProduct?.productNumber.slice(-3) || '***'}`,
            })}
          </p>
        </div>
      </div>
      <div slot="footer">
        <MButton
          class="d-grid"
          text={t('button.cancel')}
          theme="secondary"
          variant="outline"
          isPill
          onClick={() => closeModal()}
        />
        <MButton
          class="d-grid"
          text={t('button.transfer')}
          theme="primary"
          isPill
          onClick={() => handleTransfer()}
          isLoading={loading}
        />
      </div>
    </MModal>
  );
}
