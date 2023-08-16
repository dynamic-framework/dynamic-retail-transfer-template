/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  MButton,
  MInput,
  MInputCurrency,
  MInputSelect,
  MQuickActionButton,
  MQuickActionSwitch,
  useModalContext,
} from '@dynamic-framework/ui-react';
import type { Product } from '@modyo-dynamic/modyo-service-retail';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  getProducts,
  getSelectedContact,
  getSelectedProduct,
  getOriginProduct,
} from '../store/selectors';
import {
  setAmountUsed,
  setMessage,
  setSelectedContact,
  setSelectedProduct,
  setOriginProduct,
} from '../store/slice';
import useAmount from '../hooks/useAmount';

export default function OngoingTransfer() {
  const { t } = useTranslation();
  const { openModal } = useModalContext();
  const dispatch = useAppDispatch();
  const [transferMessage, setTransferMessage] = useState<string | undefined>();

  const products = useAppSelector(getProducts);
  const originProduct = useAppSelector(getOriginProduct);
  const selectedContact = useAppSelector(getSelectedContact);
  const selectedProduct = useAppSelector(getSelectedProduct) as Product;
  const productsOrigin = useMemo(
    () => {
      if (selectedProduct) {
        return products.filter(({ id }) => id !== selectedProduct.id);
      }

      return products;
    },
    [products, selectedProduct],
  );

  const {
    amount,
    setAmount,
    hint,
    originProductAmount,
    canTransfer,
  } = useAmount();

  useEffect(() => {
    if (originProduct === undefined) {
      dispatch(setOriginProduct(productsOrigin[0]));
    }
  }, [dispatch, originProduct, productsOrigin]);

  return (
    <div className="bg-white rounded shadow-sm p-3 d-flex flex-column gap-3">
      <MInputSelect
        label={t('ongoingTransfer.from')}
        mId="selectAccountFrom"
        {...(originProduct) && {
          selectedOption: originProduct,
        }}
        valueExtractor={({ productNumber }: Product) => productNumber}
        labelExtractor={({ name, productNumber }: Product) => `${name} ••• ${productNumber.slice(-3)}`}
        options={productsOrigin}
        onMChange={({ detail: product }: CustomEvent<Product>) => (
          dispatch(setOriginProduct(product))
        )}
      />
      <MInputCurrency
        label={t('ongoingTransfer.amount')}
        mId="amountToTransfer"
        hint={hint.message}
        onChange={(value) => setAmount(value)}
        value={amount}
        placeholder={t('ongoingTransfer.amountPlaceholder')}
        minValue={1}
        maxValue={originProductAmount}
      />
      <div className="d-flex flex-column gap-2">
        <h6 className="fw-bold sp px-2 text-gray">{t('ongoingTransfer.title')}</h6>
        <div>
          {selectedContact && (
            <MQuickActionButton
              className="w-100"
              line1={selectedContact.name}
              line2={`${selectedContact.bank} ${selectedContact.productNumber.slice(-3)}`}
              representativeImage={selectedContact.image}
              actionLinkText={t('ongoingTransfer.change')}
              onMClick={() => dispatch(setSelectedContact(undefined))}
            />
          )}
          {selectedProduct && (
            <MQuickActionButton
              className="w-100"
              line1={selectedProduct.name}
              line2={`••• ${selectedProduct.productNumber.slice(-3)}`}
              representativeIcon="heart-fill"
              actionLinkText={t('ongoingTransfer.change')}
              onMClick={() => dispatch(setSelectedProduct(undefined))}
            />
          )}
        </div>
      </div>
      <MInput
        mId="optionalMessage"
        label={t('ongoingTransfer.addMessage')}
        placeholder={t('ongoingTransfer.addMessagePlaceholder')}
        value={transferMessage}
        onMChange={({ detail }) => setTransferMessage(detail as string)}
      />
      <MQuickActionSwitch
        isDisabled
        label={t('collapse.schedule')}
        hint={t('collapse.scheduleHint')}
        mId="scheduleTransfer"
      />
      <MButton
        className="align-self-center"
        {...!canTransfer && { state: 'disabled' }}
        {...selectedContact && { state: 'disabled' }}
        text={t('button.transfer')}
        isPill
        onMClick={() => {
          dispatch(setMessage(transferMessage));
          dispatch(setAmountUsed(amount));
          openModal('confirmTransfer');
        }}
      />
    </div>
  );
}
