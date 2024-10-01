import { DQuickActionButton } from '@dynamic-framework/ui-react';
import { useCallback } from 'react';

import type { Account } from '../services/interface';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { getAccounts, getIsLoadingAccounts } from '../store/selectors';
import { setCurrentView, setSelectedAccount } from '../store/slice';

import LoaderList from './LoaderList';

export default function AccountList() {
  const dispatch = useAppDispatch();
  const isLoadingAccounts = useAppSelector(getIsLoadingAccounts);
  const accountsToTransfer = useAppSelector(getAccounts);

  const handleSelectAccount = useCallback((account: Account) => {
    dispatch(setCurrentView('details'));
    dispatch(setSelectedAccount(account));
  }, [dispatch]);

  if (isLoadingAccounts) {
    return <LoaderList />;
  }
  return (
    <div className="d-flex flex-column accounts">
      {accountsToTransfer.map((account) => (
        <DQuickActionButton
          line1={account.name}
          line2={`*** ${account.accountNumber.slice(-3)}`}
          key={account.id}
          representativeIcon="heart-fill"
          onClick={() => handleSelectAccount(account)}
        />
      ))}
    </div>
  );
}
