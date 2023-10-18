import { DQuickActionButton } from '@dynamic-framework/ui-react';
import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSelectedAccount } from '../store/slice';
import SkeletonList from './SkeletonList';
import { getAccounts, getIsLoadingAccounts } from '../store/selectors';

import type { Account } from '../services/interface';

export default function AccountList() {
  const dispatch = useAppDispatch();
  const isLoadingAccounts = useAppSelector(getIsLoadingAccounts);
  const accountsToTransfer = useAppSelector(getAccounts);

  const handleSelectAccount = useCallback((account: Account) => {
    dispatch(setSelectedAccount(account));
  }, [dispatch]);

  if (isLoadingAccounts) {
    return <SkeletonList />;
  }
  return (
    <div className="d-flex flex-column accounts">
      {accountsToTransfer.map((account) => (
        <DQuickActionButton
          line1={account.name}
          line2={`••• ${account.accountNumber.slice(-3)}`}
          key={account.id}
          representativeIcon="heart-fill"
          onClick={() => handleSelectAccount(account)}
        />
      ))}
    </div>
  );
}
