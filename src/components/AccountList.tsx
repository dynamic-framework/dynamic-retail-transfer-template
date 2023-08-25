import { MQuickActionButton } from '@dynamic-framework/ui-react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSelectedAccount } from '../store/slice';

import SkeletonList from './SkeletonList';
import { Account } from '../services/interface';
import { getAccounts, getIsLoadingAccounts } from '../store/selectors';

export default function AccountList() {
  const dispatch = useAppDispatch();
  const isLoadingAccounts = useAppSelector(getIsLoadingAccounts);
  const accountsToTransfer = useAppSelector(getAccounts);

  const handleSelectAccount = (account: Account) => {
    dispatch(setSelectedAccount(account));
  };

  if (isLoadingAccounts) {
    return <SkeletonList />;
  }
  return (
    <div className="d-flex flex-column accounts">
      {accountsToTransfer.map((account) => (
        <MQuickActionButton
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
