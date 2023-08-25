/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  MButton,
  MInput,
  MInputCurrency,
  MInputSelect,
  MQuickActionButton,
  MQuickActionSwitch,
  useModalContext,
} from '@dynamic-framework/ui-react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  getSelectedContact,
  getSelectedAccount,
  getOriginAccount,
  getAccounts,
} from '../store/selectors';
import {
  setAmountUsed,
  setMessage,
  setSelectedContact,
  setSelectedAccount,
  setOriginAccount,
} from '../store/slice';
import useAmount from '../services/hooks/useAmount';
import { Account } from '../services/interface';

export default function OngoingTransfer() {
  const { t } = useTranslation();
  const { openModal } = useModalContext();
  const dispatch = useAppDispatch();
  const [transferMessage, setTransferMessage] = useState<string | undefined>();

  const accounts = useAppSelector(getAccounts);
  const originAccount = useAppSelector(getOriginAccount);
  const selectedContact = useAppSelector(getSelectedContact);
  const selectedAccount = useAppSelector(getSelectedAccount) as Account;
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

  useEffect(() => {
    if (originAccount === undefined) {
      dispatch(setOriginAccount(accountsOrigin[0]));
    }
  }, [dispatch, originAccount, accountsOrigin]);

  return (
    <div className="bg-white rounded shadow-sm p-3 d-flex flex-column gap-3">
      <MInputSelect
        label={t('ongoingTransfer.from')}
        mId="selectAccountFrom"
        {...(originAccount) && {
          selectedOption: originAccount,
        }}
        valueExtractor={({ accountNumber }: Account) => accountNumber}
        labelExtractor={({ name, accountNumber }: Account) => `${name} ••• ${accountNumber.slice(-3)}`}
        options={accountsOrigin}
        onMChange={({ detail: account }: CustomEvent<Account>) => (
          dispatch(setOriginAccount(account))
        )}
      />
      <MInputCurrency
        label={t('ongoingTransfer.amount')}
        mId="amountToTransfer"
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
            <MQuickActionButton
              className="w-100"
              line1={selectedContact.name}
              line2={`${selectedContact.bank} ${selectedContact.accountNumber.slice(-3)}`}
              representativeImage={selectedContact.image}
              actionLinkText={t('ongoingTransfer.change')}
              onMClick={() => dispatch(setSelectedContact(undefined))}
            />
          )}
          {selectedAccount && (
            <MQuickActionButton
              className="w-100"
              line1={selectedAccount.name}
              line2={`••• ${selectedAccount.accountNumber.slice(-3)}`}
              representativeIcon="heart-fill"
              actionLinkText={t('ongoingTransfer.change')}
              onMClick={() => dispatch(setSelectedAccount(undefined))}
            />
          )}
        </div>
      </div>
      <MInput
        mId="optionalMessage"
        label={t('ongoingTransfer.addMessage')}
        placeholder={t('ongoingTransfer.addMessagePlaceholder')}
        value={transferMessage}
        onMChange={({ detail }) => setTransferMessage(detail as string)}
      />
      <MQuickActionSwitch
        isDisabled
        label={t('collapse.schedule')}
        hint={t('collapse.scheduleHint')}
        mId="scheduleTransfer"
      />
      <MButton
        className="align-self-center"
        {...!canTransfer && { state: 'disabled' }}
        {...selectedContact && { state: 'disabled' }}
        text={t('button.transfer')}
        isPill
        onMClick={() => {
          dispatch(setMessage(transferMessage));
          dispatch(setAmountUsed(amount));
          openModal('confirmTransfer');
        }}
      />
    </div>
  );
}
