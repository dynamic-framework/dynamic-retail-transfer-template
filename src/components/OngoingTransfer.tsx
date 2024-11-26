/* eslint-disable react/jsx-props-no-spreading */
import {
  DButton,
  DCard,
  DDatePicker,
  DInput,
  DInputCurrency,
  DInputSelect,
  DInputSwitch,
  useDPortalContext,
  useDToast,
} from '@dynamic-framework/ui-react';
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import useAmount from '../hooks/useAmount';
import type { Account } from '../services/interface';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  getSelectedContact,
  getSelectedAccount,
  getOriginAccount,
  getAccounts,
  getScheduledTransfer,
} from '../store/selectors';
import {
  setAmountUsed,
  setMessage,
  setSelectedContact,
  setSelectedAccount,
  setOriginAccount,
  setScheduledTransaction,
  setCurrentView,
} from '../store/slice';

export default function OngoingTransfer() {
  const { t } = useTranslation();
  const [isScheduled, setIsScheduled] = useState(false);
  const { openPortal } = useDPortalContext();
  const dispatch = useAppDispatch();
  const [transferMessage, setTransferMessage] = useState<string>('');
  const { toast } = useDToast();

  const accounts = useAppSelector(getAccounts);
  const originAccount = useAppSelector(getOriginAccount);
  const selectedContact = useAppSelector(getSelectedContact);
  const selectedAccount = useAppSelector(getSelectedAccount) as Account;
  const scheduledTransfer = useAppSelector(getScheduledTransfer);
  const accountsOrigin = useMemo(() => {
    if (!selectedAccount) {
      return accounts;
    }
    return accounts.filter(({ id }) => id !== selectedAccount.id);
  }, [accounts, selectedAccount]);

  const {
    amount,
    setAmount,
    hint,
    originAccountAmount,
    canTransfer,
  } = useAmount();

  const handleChangeDestiny = useCallback(() => {
    dispatch(setSelectedContact(undefined));
    dispatch(setSelectedAccount(undefined));
    dispatch(setCurrentView('init'));
  }, [dispatch]);

  useEffect(() => {
    if (originAccount === undefined) {
      dispatch(setOriginAccount(accountsOrigin[0]));
    }
  }, [dispatch, originAccount, accountsOrigin]);

  return (
    <DCard>
      <DCard.Body className="d-flex flex-column gap-4">
        <DInputSelect<Account>
          label={t('ongoingTransfer.from')}
          id="selectAccountFrom"
          {...(originAccount) && {
            selectedOption: originAccount,
          }}
          valueExtractor={({ accountNumber }: Account) => accountNumber}
          labelExtractor={({ name, accountNumber }: Account) => `${name} *** ${accountNumber.slice(-3)}`}
          options={accountsOrigin}
          onChange={(account) => (
            dispatch(setOriginAccount(account))
          )}
        />
        <DInputCurrency
          label={t('ongoingTransfer.amount')}
          id="amountToTransfer"
          hint={hint.message}
          onChange={(value) => setAmount(value)}
          value={amount}
          placeholder={t('ongoingTransfer.amountPlaceholder')}
          minValue={1}
          maxValue={originAccountAmount}
        />
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
                  <small className="text-gray-500">{`${selectedContact.bank} ${selectedContact.accountNumber.slice(-3)}`}</small>
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
                  <small className="text-gray-500">{`*** ${selectedAccount.accountNumber.slice(-3)}`}</small>
                </div>
                <span className="text-primary ms-auto">{t('ongoingTransfer.change')}</span>
              </button>
            )}
          </div>
        </div>
        <DInput
          id="optionalMessage"
          label={t('ongoingTransfer.addMessage')}
          placeholder={t('ongoingTransfer.addMessagePlaceholder')}
          value={transferMessage}
          onChange={(value) => setTransferMessage(value)}
        />

        <div>
          <DInputSwitch
            label={t('collapse.schedule')}
            checked={isScheduled}
            className="mb-0"
            onChange={() => {
              setIsScheduled((prev) => !prev);
              dispatch(setScheduledTransaction(null));
            }}
          />
          <small className="form-text">{t('collapse.scheduleHint')}</small>
        </div>

        {isScheduled && (
          <DDatePicker
            date={scheduledTransfer}
            iconHeaderNextMonth="chevron-right"
            iconHeaderPrevMonth="chevron-left"
            minDate={new Date()}
            placeholderText={t('ongoingTransfer.selectDate')}
            maxDate={new Date(new Date().setMonth(new Date().getMonth() + 12))}
            iconInput="calendar"
            inputAriaLabel="Calendar"
            onChange={(date) => {
              dispatch(setScheduledTransaction(date?.toISOString() || null));
            }}
          />
        )}
        <DButton
          className="d-flex align-self-center"
          text={t('button.transfer')}
          onClick={() => {
            if (!canTransfer) {
              toast({
                title: t('errors.selectAmount'),
                soft: true,
                theme: 'danger',
              });
              return;
            }
            dispatch(setMessage(transferMessage));
            dispatch(setAmountUsed(amount));
            openPortal('modalConfirmTransfer', undefined);
          }}
        />
      </DCard.Body>
    </DCard>
  );
}
