import { DCard } from '@dynamic-framework/ui-react';
import { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';

import Otp from './components/Otp';

type Props = PropsWithChildren<{
  action: () => Promise<void> | void;
  isLoading?: boolean;
}>;

export default function OtpCard(
  {
    action,
    children,
    isLoading,
  }: Props,
) {
  const { t } = useTranslation();

  return (
    <DCard>
      <DCard.Body className="d-flex flex-column gap-6">
        <h4>{t('otp.title')}</h4>
        <Otp
          isLoading={isLoading}
          action={action}
          classNameActions="flex-lg-row-reverse align-items-lg-center justify-content-lg-between"
        >
          {children}
        </Otp>
      </DCard.Body>
    </DCard>
  );
}
