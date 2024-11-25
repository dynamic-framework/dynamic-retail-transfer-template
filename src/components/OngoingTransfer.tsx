/* eslint-disable react/jsx-props-no-spreading */
import {
  DButton,
  DDatePicker,
  DInput,
  DInputCurrency,
  DInputSelect,
  DQuickActionButton,
  DQuickActionSwitch,
  useDPortalContext,
} from '@dynamic-framework/ui-react';
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import useAmount from '../hooks/useAmount';
import { DepositAccount } from '../services/interface';
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
  setCurrentStep,
} from '../store/slice';

export default function OngoingTransfer() {
  const { t } = useTranslation();
  const [isScheduled, setIsScheduled] = useState(false);
  const { openPortal } = useDPortalContext();
  const dispatch = useAppDispatch();
  const [transferMessage, setTransferMessage] = useState<string>('');

  const accounts = useAppSelector(getAccounts);
  const originAccount = useAppSelector(getOriginAccount);
  const selectedContact = useAppSelector(getSelectedContact);
  const selectedAccount = useAppSelector(getSelectedAccount);
  const scheduledTransfer = useAppSelector(getScheduledTransfer);
  const accountsOrigin = useMemo(() => {
    if (selectedAccount) {
      return accounts.filter(({ id }) => id !== selectedAccount.id);
    }
    return accounts;
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
    dispatch(setCurrentStep('init'));
  }, [dispatch]);

  useEffect(() => {
    if (originAccount === undefined) {
      dispatch(setOriginAccount(accountsOrigin[0]));
    }
  }, [dispatch, originAccount, accountsOrigin]);

  return (
    <div className="d-flex flex-column gap-4">
      <DInputSelect<DepositAccount>
        label={t('ongoingTransfer.from')}
        id="selectAccountFrom"
        {...(originAccount) && {
          selectedOption: originAccount,
        }}
        valueExtractor={({ accountNumber }: DepositAccount) => accountNumber}
        labelExtractor={({ name, accountNumber }: DepositAccount) => `${name} *** ${accountNumber.slice(-3)}`}
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
      <DInput
        id="optionalMessage"
        label={t('ongoingTransfer.addMessage')}
        placeholder={t('ongoingTransfer.addMessagePlaceholder')}
        value={transferMessage}
        onChange={(value) => setTransferMessage(value)}
      />
      <DQuickActionSwitch
        label={t('collapse.schedule')}
        hint={t('collapse.scheduleHint')}
        id="scheduleTransfer"
        checked={isScheduled}
        onClick={() => {
          setIsScheduled((prev) => !prev);
          dispatch(setScheduledTransaction());
        }}
      />
      {isScheduled && (
        <DDatePicker
          date={scheduledTransfer}
          iconHeaderNextMonth="chevron-right"
          iconHeaderPrevMonth="chevron-left"
          minDate={new Date()}
          placeholder={t('ongoingTransfer.selectDate')}
          maxDate={new Date(new Date().setMonth(new Date().getMonth() + 12))}
          iconInput="calendar"
          inputAriaLabel="Calendar"
          onChange={(date) => {
            dispatch(setScheduledTransaction(date?.toISOString()));
          }}
        />
      )}
      <DButton
        className="d-flex align-self-center"
        {...!canTransfer && { state: 'disabled' }}
        text={t('button.transfer')}
        onClick={() => {
          dispatch(setMessage(transferMessage));
          dispatch(setAmountUsed(amount));
          openPortal('modalConfirmTransfer', undefined);
        }}
      />
    </div>
  );
}
