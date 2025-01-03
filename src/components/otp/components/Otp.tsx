/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */

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
import { Trans } from 'react-i18next';

import OtpCountDown from './OtpCountDown';

const OTP_LENGTH = 6;

type Props = PropsWithChildren<{
  actionText?: string;
  action: () => Promise<void> | void;
  message?: string;
  helpLink?: string;
  isLoading?: boolean;
  classNameActions?: string;
}>;

export default function Otp(
  {
    classNameActions,
    action,
    actionText = 'Authorize and Continue',
    children,
    helpLink = 'https://dynamicframework.dev',
    isLoading,
    message = 'For authorization, please enter the 6-digit code we’ve sent to your associated phone number',
  }: Props,
) {
  const { closePortal } = useDPortalContext();
  const [otp, setOtp] = useState('');
  const [invalid, setInvalid] = useState(false);

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
      {message}
      <div className="d-flex flex-column gap-6 pb-4 px-lg-3">
        <div className="d-flex flex-column gap-6">
          <DInputPin
            className="modal-otp-pin"
            characters={OTP_LENGTH}
            onChange={(e) => setOtp(e)}
            invalid={invalid && otp.length < OTP_LENGTH}
            placeholder="0"
          />
          <OtpCountDown seconds={15} />
        </div>
        <hr className="m-0" />
        <div
          className={classNames(
            'd-flex flex-column gap-4',
            classNameActions || '',
          )}
        >
          <DButton
            text={actionText}
            onClick={handler}
            loading={isLoading}
          />
          <Trans
            i18nKey="otp.problems"
            components={{
              a: <a
                href={helpLink}
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
