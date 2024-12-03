/* eslint-disable react/jsx-props-no-spreading */
import {
  DButton,
  DInput,
  DInputCurrency,
  DSelect,
  useDPortalContext,
  useDToast,
  DDatePicker,
  DQuickActionSwitch,
  DCard,
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
  setMessage,
  setOriginAccount,
  setScheduledTransaction,
} from '../store/slice';

import TransferTo from './TransferTo';

export default function OngoingTransfer() {
  const { t } = useTranslation();
  const { openPortal } = useDPortalContext();
  const dispatch = useAppDispatch();

  const [isScheduled, setIsScheduled] = useState(false);
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
          getOptionLabel={({ name, accountNumber }: DepositAccount) => `${name} *** ${accountNumber.slice(-3)}`}
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
            openPortal('modalConfirmTransfer', undefined);
          }}
        />
      </DCard.Body>
    </DCard>
  );
}
