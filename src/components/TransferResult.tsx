import { useCallback, useMemo } from 'react';
import {
  DButton,
  DIcon,
  useFormatCurrency,
} from '@dynamic-framework/ui-react';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';

import { useAppSelector } from '../store/hooks';
import {
  getAmountUsed,
  getResult,
  getSelectedContact,
  getSelectedAccount,
} from '../store/selectors';
import errorHandler from '../utils/errorHandler';

import type { Transaction } from '../services/interface';
import { DASHBOARD_PATH, SITE_URL } from '../config/widgetConfig';
import useScreenshotWebShare from '../hooks/useScreenshotWebShare';
import useScreenshotDownload from '../hooks/useScreenshotDownload';

export default function TransferResult() {
  const amountUsed = useAppSelector(getAmountUsed);
  const result = useAppSelector(getResult) as Transaction;
  const selectedContact = useAppSelector(getSelectedContact);
  const selectedAccount = useAppSelector(getSelectedAccount);
  const { shareRef, share } = useScreenshotWebShare();
  const { downloadRef, download } = useScreenshotDownload();

  const { values: [amountUsedFormatted] } = useFormatCurrency(amountUsed);

  const { t } = useTranslation();

  const transferDone = useMemo(() => result.status === 'completed', [result.status]);

  const gotToAccounts = useCallback(() => {
    window.location.href = `${SITE_URL}/${DASHBOARD_PATH}`;
  }, []);

  return (
    <div className="bg-white rounded shadow-sm p-6">
      <div className="d-flex flex-column align-items-center gap-6">
        <div
          className="d-flex flex-column gap-6 bg-white rounded w-100"
          ref={(el) => {
            shareRef.current = el;
            downloadRef.current = el;
          }}
        >
          <div className="d-flex flex-column gap-2 align-items-center">
            <DIcon
              icon={transferDone ? 'check-circle' : 'x-circle'}
              size="2rem"
              theme={transferDone ? 'success' : 'danger'}
            />
            <h5 className="fw-bold">
              {t(transferDone ? 'result.transferSuccess' : 'result.transferFailed')}
            </h5>
          </div>
          {transferDone && (
            <>
              <div className="d-flex flex-column gap-1 text-center px-4 py-2 bg-indigo-soft rounded-1">
                <span className="text-gray fw-bold fs-3">{amountUsedFormatted}</span>
                <p className="sp mb-0">
                  {t('result.moneyPaid')}
                </p>
              </div>
              <hr className="m-0" />
              <div className="d-flex flex-column px-4 gap-2">
                <div className="row">
                  <div className="col-6 text-light-emphasis">{t('result.transferTo')}</div>
                  <div className="col-6 text-end">{selectedContact?.name || selectedAccount?.name}</div>
                </div>
                <div className="row">
                  <div className="col-6 text-light-emphasis">{t('result.transactionId')}</div>
                  <div className="col-6 text-end">{result.id}</div>
                </div>
                <div className="row">
                  <div className="col-6 text-light-emphasis">{t('result.timeDate')}</div>
                  <div className="col-6 text-end">{DateTime.fromISO(result.date).toFormat('MM/dd/yy, hh:mm a')}</div>
                </div>
              </div>
            </>
          )}
          {!transferDone && (
            <>
              <div className="d-flex flex-column gap-1 text-center px-4 py-2 bg-indigo-soft rounded-1">
                <p className="mb-0">
                  {t('result.transferErrorMessage')}
                </p>
              </div>
              <hr className="m-0" />
              <div className="d-flex flex-column px-4 gap-2">
                <div className="row">
                  <div className="col-6 text-light-emphasis">{t('result.transferTo')}</div>
                  <div className="col-6 text-end">{selectedContact?.name || selectedAccount?.name}</div>
                </div>
                <div className="row">
                  <div className="col-6 text-light-emphasis">{t('result.timeDate')}</div>
                  <div className="col-6 text-end">{DateTime.fromISO(result.date).toFormat('MM/dd/yy, hh:mm a')}</div>
                </div>
              </div>
            </>
          )}
          <div className="d-flex gap-4 align-items-center justify-content-center">
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
        <div className="row w-100">
          <div className="col-6 d-flex justify-content-end">
            <DButton
              onClick={() => {
                share().catch(errorHandler);
              }}
              iconEnd="share"
              text={t('button.share')}
              theme="secondary"
              variant="link"
            />
          </div>
          <div className="col-6 d-flex justify-content-start">
            <DButton
              onClick={() => {
                download().catch(errorHandler);
              }}
              iconEnd="download"
              text={t('button.download')}
              theme="secondary"
              variant="link"
            />
          </div>
        </div>
        <div className="d-flex justify-content-center align-items-center gap-6 w-100">
          {!transferDone && (
          <DButton
            className="flex-1 d-grid"
            text={t('button.back')}
            theme="secondary"
            variant="outline"
          />
          )}
          <DButton
            className={!transferDone ? 'flex-1 d-grid' : ''}
            text={t(transferDone ? 'button.back' : 'button.retry')}
            theme="primary"
            onClick={gotToAccounts}
          />
        </div>
      </div>
    </div>
  );
}
