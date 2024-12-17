import { DCard } from '@dynamic-framework/ui-react';
import { PropsWithChildren } from 'react';

import Otp from './components/Otp';

type Props = PropsWithChildren<{
  title?: string;
  actionText?: string;
  action: () => Promise<void> | void;
  message?: string;
  helpLink?: string;
  isLoading?: boolean;
}>;

export default function OtpCard(
  {
    action,
    actionText = 'Authorize and Continue',
    children,
    helpLink = 'https://dynamicframework.dev',
    isLoading,
    message = 'We will send you a 6-digit code to your associated phone number so you can continue with your request',
    title = 'Authorize',
  }: Props,
) {
  return (
    <DCard>
      <DCard.Body className="d-flex flex-column gap-6">
        <h4>{title}</h4>
        <Otp
          actionText={actionText}
          message={message}
          isLoading={isLoading}
          helpLink={helpLink}
          action={action}
          classNameActions="flex-lg-row-reverse align-items-lg-center justify-content-lg-between"
        >
          {children}
        </Otp>
      </DCard.Body>
    </DCard>
  );
}
