import { useAppSelector } from '../store/hooks';
import { getAccounts, getIsLoadingAccounts } from '../store/selectors';

import AccountListItem from './AccountListItem';
import LoaderList from './LoaderList';

export default function AccountList() {
  const isLoadingAccounts = useAppSelector(getIsLoadingAccounts);
  const accountsToTransfer = useAppSelector(getAccounts);

  if (isLoadingAccounts) {
    return <LoaderList />;
  }

  return (
    <div className="d-flex flex-column accounts">
      {accountsToTransfer.map((account) => (
        <AccountListItem
          depositAccount={account}
          key={account.id}
        />
      ))}
    </div>
  );
}
