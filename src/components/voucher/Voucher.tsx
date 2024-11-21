import { DButton, DCard, DIcon } from '@dynamic-framework/ui-react';
import classNames from 'classnames';
import { PropsWithChildren, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

import errorHandler from '../../utils/errorHandler';

import useScreenshotDownload from './hooks/useScreenshotDownload';
import useScreenshotWebShare from './hooks/useScreenshotWebShare';

type Props = PropsWithChildren<{
  amount?: string;
  amountDetails?: ReactNode;
  icon?: string;
  iconTheme?: string;
  message: string;
  title: string;
}>;

export default function Voucher(
  {
    amount,
    amountDetails,
    icon = 'check-circle',
    iconTheme = 'success',
    title,
    message,
    children,
  }: Props,
) {
  const { t } = useTranslation();
  const { shareRef, share } = useScreenshotWebShare();
  const { downloadRef, download } = useScreenshotDownload();

  return (
    <div
      className="mb-6"
      ref={(el) => {
        shareRef.current = el;
        downloadRef.current = el;
      }}
    >
      <DCard>
        <DCard.Body className="d-flex flex-column p-4 px-lg-16 py-lg-8 gap-6">
          <div className="d-flex flex-column align-items-center justify-content-center gap-4">
            <DIcon
              icon={icon}
              size="var(--bs-ref-spacer-8)"
              theme={iconTheme}
            />
            <div className="text-center">
              <h3 className="mb-2">{title}</h3>
              <p className="m-0">{message}</p>
            </div>
          </div>
          {amount && (
            <div className="bg-secondary-soft p-2 rounded-2">
              <div
                className={classNames(
                  'text-center fw-bold fs-3',
                  amountDetails ? 'mb-1' : 'm-0',
                )}
              >
                {amount}
              </div>
              {amountDetails}
            </div>
          )}

          <hr className="m-0" />
          {children}
          <hr className="m-0" />

          <div className="d-flex justify-content-center justify-content-sm-start gap-4">
            <DButton
              onClick={() => share().catch(errorHandler)}
              iconEnd="share"
              text={t('voucher.share')}
              variant="link"
              size="sm"
            />
            <DButton
              onClick={() => download().catch(errorHandler)}
              iconEnd="download"
              text={t('voucher.download')}
              variant="link"
              size="sm"
            />
          </div>
        </DCard.Body>
      </DCard>
    </div>
  );
}
