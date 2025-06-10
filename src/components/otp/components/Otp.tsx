/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-props-no-spreading */

import {
  DButton,
  DInputPin,
  useDPortalContext,
} from '@dynamic-framework/ui-react';
import classNames from 'classnames';
import {
  PropsWithChildren,
  useCallback,
  useState,
} from 'react';
import { Trans, useTranslation } from 'react-i18next';

import OtpCountDown from './OtpCountdown';

const OTP_LENGTH = 6;
const OTP_SECONDS = 15;

type Props = PropsWithChildren<{
  action: () => Promise<void> | void;
  isLoading?: boolean;
  classNameActions?: string;
}>;

export default function Otp(
  {
    classNameActions,
    action,
    children,
    isLoading,
  }: Props,
) {
  const { closePortal } = useDPortalContext();
  const [otp, setOtp] = useState('');
  const [invalid, setInvalid] = useState(false);
  const { t } = useTranslation();

  const handler = useCallback(async () => {
    if (otp.length < OTP_LENGTH) {
      setInvalid(true);
      return;
    }

    setInvalid(false);

    await action();
    closePortal();
  }, [otp.length, action, closePortal]);

  return (
    <>
      {children}
      {t('otp.message')}
      <div className="d-flex flex-column gap-6 pb-4 px-lg-3">
        <div className="d-flex flex-column gap-6">
          <div className="d-flex">
            <DInputPin
              className="modal-otp-pin"
              characters={OTP_LENGTH}
              onChange={(e) => setOtp(e)}
              invalid={invalid && otp.length < OTP_LENGTH}
              placeholder="0"
            />
          </div>
          <OtpCountDown seconds={OTP_SECONDS} />
        </div>
        <hr className="m-0" />
        <div
          className={classNames(
            'd-flex flex-column gap-4',
            classNameActions || '',
          )}
        >
          <DButton
            text={t('otp.actions.continue')}
            onClick={handler}
            loading={isLoading}
          />
          <Trans
            i18nKey="otp.problems"
            components={{
              a: <a
                href={t('otp.helpLink')}
                className="link-primary text-nowrap"
                target="_blank"
                rel="noreferrer"
              />,
              p: <p
                className="mb-0 text-center"
              />,
            }}
          />
        </div>
      </div>
    </>
  );
}
