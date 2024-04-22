/* eslint-disable react/jsx-props-no-spreading */
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  DButton,
  DInput,
  DInputCurrency,
  DInputSelect,
  DQuickActionButton,
  DQuickActionSwitch,
  useDPortalContext,
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
import useAmount from '../hooks/useAmount';

import type { Account } from '../services/interface';

export default function OngoingTransfer() {
  const { t } = useTranslation();
  const { openPortal } = useDPortalContext();
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
    <div className="bg-white rounded shadow-sm p-4 d-flex flex-column gap-4">
      <DInputSelect<Account>
        label={t('ongoingTransfer.from')}
        id="selectAccountFrom"
        {...(originAccount) && {
          selectedOption: originAccount,
        }}
        valueExtractor={({ accountNumber }: Account) => accountNumber}
        labelExtractor={({ name, accountNumber }: Account) => `${name} ••• ${accountNumber.slice(-3)}`}
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
              representativeImage={selectedContact.image}
              actionLinkText={t('ongoingTransfer.change')}
              onClick={() => dispatch(setSelectedContact(undefined))}
            />
          )}
          {selectedAccount && (
            <DQuickActionButton
              className="w-100"
              line1={selectedAccount.name}
              line2={`••• ${selectedAccount.accountNumber.slice(-3)}`}
              representativeIcon="heart-fill"
              actionLinkText={t('ongoingTransfer.change')}
              onClick={() => dispatch(setSelectedAccount(undefined))}
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
        disabled
        label={t('collapse.schedule')}
        hint={t('collapse.scheduleHint')}
        id="scheduleTransfer"
      />
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
