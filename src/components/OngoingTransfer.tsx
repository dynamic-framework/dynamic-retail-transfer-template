/* eslint-disable react/jsx-props-no-spreading */
import {
  DButton,
  DInput,
  DInputCurrency,
  DSelect,
  useDToast,
  DDatePicker,
  DCard,
  DInputSwitch,
} from '@dynamic-framework/ui-react';
import {
  useEffect,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import useAmount from '../hooks/useAmount';
import { DepositAccount } from '../services/interface';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  getOriginAccount,
  getScheduledTransfer,
  getAccountsTransferFrom,
} from '../store/selectors';
import {
  setAmountUsed,
  setCurrentStep,
  setMessage,
  setOriginAccount,
  setScheduledTransaction,
} from '../store/slice';

import TransferTo from './TransferTo';

export default function OngoingTransfer() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [transferMessage, setTransferMessage] = useState<string>('');
  const { toast } = useDToast();

  const originAccount = useAppSelector(getOriginAccount);
  const accountsTransferFrom = useAppSelector(getAccountsTransferFrom);
  const scheduledTransfer = useAppSelector(getScheduledTransfer);

  const {
    amount,
    setAmount,
    hint,
    originAmount,
    enableTransfer,
  } = useAmount();

  useEffect(() => {
    if (!originAccount) {
      dispatch(setOriginAccount(accountsTransferFrom[0]));
    }
  }, [dispatch, originAccount, accountsTransferFrom]);

  return (
    <DCard>
      <DCard.Body className="d-flex flex-column gap-4">
        <DSelect
          label={t('ongoingTransfer.from')}
          getOptionLabel={({ name, accountNumber }: DepositAccount) => `${name} - ${accountNumber}`}
          getOptionValue={({ accountNumber }: DepositAccount) => accountNumber}
          options={accountsTransferFrom}
          onChange={(account) => (
            dispatch(setOriginAccount(account as DepositAccount))
          )}
          value={originAccount}
        />
        <DInputCurrency
          label={t('ongoingTransfer.amount')}
          id="amountToTransfer"
          hint={hint.message}
          onChange={(value) => setAmount(value)}
          value={amount}
          placeholder={t('ongoingTransfer.amountPlaceholder')}
          minValue={1}
          maxValue={originAmount}
        />
        <TransferTo />
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
            checked={!!scheduledTransfer}
            className="mb-0"
            onChange={(active) => {
              dispatch(setScheduledTransaction(active ? new Date().toISOString() : undefined));
            }}
          />
          <small className="form-text">{t('collapse.scheduleHint')}</small>
        </div>

        {scheduledTransfer && (
          <DDatePicker
            date={scheduledTransfer}
            iconHeaderNextMonth="chevron-right"
            iconHeaderPrevMonth="chevron-left"
            minDate={new Date()}
            placeholder={t('ongoingTransfer.selectDate')}
            iconInput="calendar"
            inputAriaLabel="Calendar"
            onChange={(date) => {
              dispatch(setScheduledTransaction(date?.toISOString()));
            }}
          />
        )}
        <DButton
          className="d-flex align-self-center"
          text={t('button.transfer')}
          onClick={() => {
            if (!enableTransfer) {
              toast({
                title: t('errors.selectAmount'),
                soft: true,
                theme: 'danger',
              });
              return;
            }
            dispatch(setMessage(transferMessage));
            dispatch(setAmountUsed(amount));
            dispatch(setCurrentStep('confirmation'));
          }}
        />
      </DCard.Body>
    </DCard>
  );
}
