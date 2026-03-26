import { DButton } from '@dynamic-framework/ui-react';
import { useTranslation } from 'react-i18next';

import { NEW_CONTACT_PATH, SITE_URL } from '../config/widgetConfig';

export default function NewContact() {
  const { t } = useTranslation();

  return (
    <DButton
      text={t('transferPanel.newContact')}
      href={`${SITE_URL}/${NEW_CONTACT_PATH}`}
      iconStart="UserRoundPlus"
      color="primary"
    />
  );
}
