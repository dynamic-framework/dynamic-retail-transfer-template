import { DQuickActionButton } from '@dynamic-framework/ui-react';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getSelectedAccount, getSelectedContact } from '../store/selectors';
import {
  setCurrentStep, setSelectedAccount, setSelectedContact,
} from '../store/slice';

export default function TransferTo() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const selectedContact = useAppSelector(getSelectedContact);
  const selectedAccount = useAppSelector(getSelectedAccount);

  const handleChangeDestiny = useCallback(() => {
    dispatch(setSelectedContact(undefined));
    dispatch(setSelectedAccount(undefined));
    dispatch(setCurrentStep('init'));
  }, [dispatch]);

  return (
    <div className="d-flex flex-column gap-2">
      <h6 className="fw-bold sp px-2 text-gray">{t('ongoingTransfer.title')}</h6>
      <div>
        {selectedContact && (
          <DQuickActionButton
            className="w-100"
            line1={selectedContact.name}
            line2={`${selectedContact.bank} ${selectedContact.accountNumber.slice(-3)}`}
            actionLinkText={t('ongoingTransfer.change')}
            onClick={handleChangeDestiny}
          />
        )}
        {selectedAccount && (
          <DQuickActionButton
            className="w-100"
            line1={selectedAccount.name}
            line2={`*** ${selectedAccount.accountNumber.slice(-3)}`}
            actionLinkText={t('ongoingTransfer.change')}
            onClick={handleChangeDestiny}
          />
        )}
      </div>
    </div>
  );
}
