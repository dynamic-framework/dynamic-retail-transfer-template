import {
  DCard,
  useFormatCurrency,
  DButton,
} from '@dynamic-framework/ui-react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import useTransfer from '../services/hooks/useTransfer';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  getAmountUsed,
  getOriginAccount,
  getScheduledTransfer,
  getSelectedAccount,
  getSelectedContact,
} from '../store/selectors';
import { setCurrentStep } from '../store/slice';

import OtpCard from './otp/OtpCard';

export default function Confirmation() {
  const amountUsed = useAppSelector(getAmountUsed);
  const selectedContact = useAppSelector(getSelectedContact);
  const selectedAccount = useAppSelector(getSelectedAccount);
  const originAccount = useAppSelector(getOriginAccount);
  const scheduledAt = useAppSelector(getScheduledTransfer);
  const dispatch = useAppDispatch();

  const { values: [amountUsedFormatted] } = useFormatCurrency(amountUsed, 0.12);
  const { callback: transfer, loading } = useTransfer();

  const handleTransfer = useCallback(async () => {
    if (!originAccount) {
      return;
    }

    await transfer(
      {
        toAccountId: selectedContact?.id || selectedAccount?.id,
        fromAccountId: originAccount.id,
        amount: amountUsed,
        scheduledAt,
      },
    );
  }, [
    amountUsed,
    originAccount,
    selectedAccount,
    selectedContact,
    scheduledAt,
    transfer,
  ]);

  const { t } = useTranslation();
  return (
    <>
      <DCard className="mb-8">
        <DCard.Body>
          <h4 className="mb-8">{t('confirmation.title', { amount: amountUsedFormatted })}</h4>
          <div className="d-flex align-items-start gap-8">
            <div className="flex-1">
              <h5 className="mb-8">{t('confirmation.detail')}</h5>
              <div>
                {t('confirmation.from', { value: `${originAccount?.name} - ${originAccount?.accountNumber}` })}
              </div>
              <div>
                {t('confirmation.to', { value: `${selectedAccount?.name} - ${selectedAccount?.accountNumber}` })}
              </div>
              <div>
                {t('confirmation.amount', { value: amountUsedFormatted })}
              </div>
            </div>
            <DButton
              className="ms-auto"
              variant="link"
              iconStart="pencil"
              text={t('edit')}
              onClick={() => dispatch(setCurrentStep('details'))}
            />
          </div>
        </DCard.Body>
      </DCard>
      <OtpCard
        action={handleTransfer}
        isLoading={loading}
        title={t('otp.title')}
      />
    </>
  );
}
