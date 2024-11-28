import {
  DButton,
  DIcon,
  useFormatCurrency,
} from '@dynamic-framework/ui-react';
import { DateTime } from 'luxon';
import { useCallback } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import {
  DASHBOARD_PATH,
  SITE_URL,
  VARS_FORMAT_DATE,
} from '../config/widgetConfig';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  getAmountUsed,
  getSelectedContact,
  getSelectedAccount,
  getScheduledTransfer,
} from '../store/selectors';
import {
  setAmountUsed,
  setCurrentStep,
} from '../store/slice';

import Voucher from './voucher/Voucher';

export default function TransferResult() {
  const amountUsed = useAppSelector(getAmountUsed);
  const selectedContact = useAppSelector(getSelectedContact);
  const selectedAccount = useAppSelector(getSelectedAccount);
  const scheduled = useAppSelector(getScheduledTransfer);
  const dispatch = useAppDispatch();
  const { values: [amountUsedFormatted] } = useFormatCurrency(amountUsed);

  const { t } = useTranslation();

  const reset = useCallback(() => {
    dispatch(setAmountUsed(undefined));
    dispatch(setCurrentStep('init'));
  }, [dispatch]);

  return (
    <>
      <Voucher
        title={t('result.transferSuccess')}
        message={t('voucher.message')}
        amount={amountUsedFormatted}
        amountDetails={t('voucher.moneySent')}
      >
        <div className="d-flex flex-column gap-6">
          {scheduled && (
            <>
              <div className="rounded-1 d-flex gap-4 align-items-center justify-content-center">
                <DIcon
                  theme="success"
                  hasCircle
                  icon="calendar"
                  size="var(--bs-ref-spacer-4)"
                />
                <span>
                  <Trans
                    i18nKey="result.scheduledTransferSuccess"
                    values={{
                      date: DateTime.fromISO(scheduled).toFormat(VARS_FORMAT_DATE),
                    }}
                  />
                </span>
              </div>
              <hr className="m-0" />
            </>
          )}
          <div>
            <h5 className="mb-2">{t('voucher.details')}</h5>
            <div>{t('result.transferTo', { value: selectedContact?.name || selectedAccount?.name })}</div>
            <div>{t('result.transactionId', { value: 'ax53-ns3g11' })}</div>
            <div>{t('result.timeDate', { value: DateTime.now().toFormat('MM/dd/yy, hh:mm a') })}</div>
          </div>
        </div>

      </Voucher>
      <div className="d-flex justify-content-center align-items-center gap-6 w-100">
        <a
          href={`${SITE_URL}/${DASHBOARD_PATH}`}
          rel="noreferrer"
          className="btn btn-outline-primary"
        >
          {t('voucher.backToHome')}
        </a>
        <DButton
          text={t('voucher.anotherOperation')}
          onClick={reset}
        />
      </div>
    </>
  );
}
