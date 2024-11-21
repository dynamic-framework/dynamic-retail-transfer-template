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
  VIEW,
} from '../config/widgetConfig';
import type { Transaction } from '../services/interface';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  getAmountUsed,
  getResult,
  getSelectedContact,
  getSelectedAccount,
  getScheduledTransfer,
  getMessage,
} from '../store/selectors';
import {
  setAmountUsed,
  setCurrentView,
} from '../store/slice';

import Voucher from './voucher/Voucher';

export default function TransferResult() {
  const amountUsed = useAppSelector(getAmountUsed);
  const result = useAppSelector(getResult) as Transaction;
  const selectedContact = useAppSelector(getSelectedContact);
  const selectedAccount = useAppSelector(getSelectedAccount);
  const scheduled = useAppSelector(getScheduledTransfer);
  const message = useAppSelector(getMessage);
  const dispatch = useAppDispatch();
  const { values: [amountUsedFormatted] } = useFormatCurrency(amountUsed);

  const { t } = useTranslation();

  const reset = useCallback(() => {
    dispatch(setAmountUsed(undefined));
    dispatch(setCurrentView(VIEW.init));
  }, [dispatch]);

  return (
    <>
      <Voucher
        title={t('result.transferSuccess')}
        message={t('voucher.message')}
      >
        <div className="d-flex flex-column gap-6">
          {scheduled && (
            <div className="p-4 rounded-1 d-flex gap-4 align-items-center justify-content-center">
              <DIcon
                theme="success"
                hasCircle
                icon="calendar"
                size="1rem"
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
          )}
          <div className="p-8 bg-gray-50 text-center">
            <h3>{amountUsedFormatted}</h3>
            <p className="sp mb-0">
              {t('result.moneyPaid')}
            </p>
          </div>
          <hr className="m-0" />
          <div>
            <div>{t('result.transferTo', { value: selectedContact?.name || selectedAccount?.name })}</div>
            <div>{t('result.transactionId', { value: result.id })}</div>
            <div>{t('result.timeDate', { value: DateTime.fromISO(result.date).toFormat('MM/dd/yy, hh:mm a') })}</div>
            <div>{t('result.message', { value: message })}</div>
          </div>

          <div className="d-flex gap-4 align-items-center justify-content-center mt-8">
            <DIcon
              theme="secondary"
              icon="shield-check"
              size="1.5rem"
            />
            <small className="text-gray-500">
              {t('result.terms.text')}
              <span className="text-secondary ms-1">
                {t('result.terms.link')}
              </span>
            </small>
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
