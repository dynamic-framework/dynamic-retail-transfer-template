import { DButton } from '@dynamic-framework/ui-react';
import { useTranslation } from 'react-i18next';

export default function ActionsVoucher() {
  const { t } = useTranslation();
  // TODO: Add logic for SS and download - See another widgets implementation

  return (
    <div className="d-flex justify-content-start gap-2 w-100">
      <DButton
        iconStart="share"
        variant="link"
        className="px-4"
        text={t('voucher.share')}
      />
      <DButton
        iconStart="download"
        className="px-4"
        variant="link"
        text={t('voucher.download')}
      />
    </div>
  );
}
