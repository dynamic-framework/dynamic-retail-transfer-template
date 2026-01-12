import { DIcon } from '@dynamic-framework/ui-react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { NEW_CONTACT_PATH, SITE_URL } from '../config/widgetConfig';

export default function NewContact() {
  const { t } = useTranslation();

  return (
    <a
      href={`${SITE_URL}/${NEW_CONTACT_PATH}`}
      className={classNames(
        'd-flex gap-4 border border-gray-100 rounded p-4 ',
        'text-black text-decoration-none hover:bg-gray-50 align-items-center',
      )}
    >
      <DIcon
        icon="UserRoundPlus"
        size="1.5rem"
        color="primary"
        hasCircle
      />
      <div>
        <strong>{t('transferPanel.newContact')}</strong>
        <small className="text-gray-500 d-block">{t('transferPanel.newContactHint')}</small>
      </div>
    </a>
  );
}
