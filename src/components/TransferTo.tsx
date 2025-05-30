import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import useContactsEffect from '../services/hooks/useContactsEffect';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  getSelectedAccount,
  getSelectedContact,
} from '../store/selectors';
import {
  setCurrentStep,
  setSelectedAccount,
  setSelectedContact,
} from '../store/slice';

import ContactLoader from './loaders/ContactLoader';

export default function TransferTo() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const selectedContact = useAppSelector(getSelectedContact);
  const selectedAccount = useAppSelector(getSelectedAccount);
  const { loading } = useContactsEffect();

  const handleChangeDestiny = useCallback(() => {
    dispatch(setSelectedContact(undefined));
    dispatch(setSelectedAccount(undefined));
    dispatch(setCurrentStep('init'));
  }, [dispatch]);

  if (loading && !selectedContact) {
    return <ContactLoader />;
  }

  return (
    <div className="d-flex flex-column gap-2">
      <h6 className="fw-bold sp px-2 text-gray">{t('ongoingTransfer.title')}</h6>
      <div>
        {selectedContact && (
          <button
            type="button"
            onClick={handleChangeDestiny}
            className="btn d-flex gap-4 align-items-center border border-gray-100 rounded w-100 p-5 reset-btn"
          >
            <div className="text-start">
              <p className="mb-1">
                <strong>{selectedContact.name}</strong>
              </p>
              <small className="text-gray-500">{`${selectedContact.bank} - ${selectedContact.accountNumber}`}</small>
            </div>
            <span className="text-primary ms-auto">{t('ongoingTransfer.change')}</span>
          </button>
        )}
        {selectedAccount && (
          <button
            type="button"
            onClick={handleChangeDestiny}
            className="btn d-flex gap-4 align-items-center border rounded-1 w-100 p-5"
          >
            <div className="text-start">
              <p className="mb-1">
                <strong>{selectedAccount.name}</strong>
              </p>
              <small className="text-gray-500">{selectedAccount.accountNumber}</small>
            </div>
            <span className="text-primary ms-auto">{t('ongoingTransfer.change')}</span>
          </button>
        )}
      </div>
    </div>
  );
}
