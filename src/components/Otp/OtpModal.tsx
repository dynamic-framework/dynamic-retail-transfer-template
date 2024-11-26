/* eslint-disable react/jsx-props-no-spreading */

import { DModal, useDPortalContext } from '@dynamic-framework/ui-react';
import { PropsWithChildren } from 'react';

import Otp from './components/Otp';

type Props = PropsWithChildren<{
  showClose?: boolean;
  title?: string;
  actionText?: string;
  action: () => Promise<void> | void;
  message?: string;
  helpLink?: string;
  isLoading?: boolean;
}>;

export default function OtpModal(
  {
    action,
    actionText = 'Authorize and Continue',
    children,
    helpLink = 'https://dynamicframework.dev',
    isLoading,
    message = 'We will send you a 6-digit code to your associated phone number so you can continue with your request',
    showClose = true,
    title = 'Authorize',
  }: Props,
) {
  const { closePortal } = useDPortalContext();

  return (
    <DModal
      name="modalOtp"
      centered
      staticBackdrop
    >
      {title && (
        <DModal.Header
          showCloseButton={showClose}
          {...showClose && { onClose: closePortal }}
        >
          <h4>{title}</h4>
        </DModal.Header>
      )}
      <DModal.Body className="d-flex flex-column gap-6">
        <Otp
          actionText={actionText}
          message={message}
          isLoading={isLoading}
          helpLink={helpLink}
          action={action}
        >
          {children}
        </Otp>
      </DModal.Body>
    </DModal>
  );
}
