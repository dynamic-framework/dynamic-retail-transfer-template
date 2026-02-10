import {
  DOtp,
  DCard,
  useFormatCurrency,
  DButton,
  DButtonIcon,
} from '@dynamic-framework/ui-react';
import { useMemo } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import useTransfer from '../services/hooks/useTransfer';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  getAmountUsed,
  getOriginAccount,
  getSelectedAccount,
  getSelectedContact,
} from '../store/selectors';
import { setCurrentStep } from '../store/slice';

export default function Confirmation() {
  const amountUsed = useAppSelector(getAmountUsed);
  const selectedContact = useAppSelector(getSelectedContact);
  const selectedAccount = useAppSelector(getSelectedAccount);
  const originAccount = useAppSelector(getOriginAccount);
  const dispatch = useAppDispatch();

  const { values: [amountUsedFormatted] } = useFormatCurrency(amountUsed, 0.12);
  const { callback: transfer, loading } = useTransfer();

  const selectedContactToTransfer = useMemo(() => selectedContact || selectedAccount, [
    selectedAccount,
    selectedContact,
  ]);

  const { t } = useTranslation();
  return (
    <>
      <DCard className="mb-8">
        <DCard.Body>
          <h4 className="mb-8">{t('confirmation.title', { amount: amountUsedFormatted })}</h4>
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h5>{t('confirmation.detail')}</h5>
            <DButton
              className="ms-auto d-none d-lg-flex"
              variant="link"
              iconStart="Pencil"
              text={t('edit')}
              onClick={() => dispatch(setCurrentStep('details'))}
            />
            <DButtonIcon
              className="ms-auto d-lg-none"
              variant="link"
              icon="Pencil"
              onClick={() => dispatch(setCurrentStep('details'))}
            />
          </div>
          <ul className="list-unstyled">
            <li>{t('confirmation.from', { value: `${originAccount?.name} - ${originAccount?.accountNumber}` })}</li>
            <li>{t('confirmation.to', { value: `${selectedContactToTransfer?.name} - ${selectedContactToTransfer?.accountNumber}` })}</li>
            <li>{t('confirmation.amount', { value: amountUsedFormatted })}</li>
          </ul>
        </DCard.Body>
      </DCard>
      <DCard>
        <DCard.Body>
          <DOtp
            action={transfer}
            isLoading={loading}
            seconds={60}
            texts={{
              title: t('otp.title'),
              resend: t('otp.resend'),
              resendText: t('otp.resendText'),
              submit: t('otp.submit'),
              contact: (
                <Trans
                  i18nKey="otp.problems"
                  values={{ linkText: t('otp.contact') }}
                  components={{
                    p: <span />,
                    a: (
                      <a
                        className="link-primary text-nowrap"
                        href={t('otp.helpLink')}
                        rel="noreferrer"
                        target="_blank"
                      >
                        {t('otp.contact')}
                      </a>
                    ),
                  }}
                />
              ),
            }}
          />
        </DCard.Body>
      </DCard>
    </>
  );
}
