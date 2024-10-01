import { DAvatar } from '@dynamic-framework/ui-react';
import classNames from 'classnames';
import { useCallback } from 'react';

import type { Account } from '../services/interface';
import { useAppDispatch } from '../store/hooks';
import { setCurrentView, setSelectedAccount } from '../store/slice';
import { getInitials } from '../utils/getInitials';

type Props = {
  account: Account;
};

export default function AccountListItem({ account }: Props) {
  const dispatch = useAppDispatch();

  const handleSelectContact = useCallback(() => {
    dispatch(setSelectedAccount(account));
    dispatch(setCurrentView('details'));
  }, [account, dispatch]);

  return (
    <button
      type="button"
      onClick={handleSelectContact}
      className={classNames(
        'd-flex gap-2 align-items-center justify-content-between w-100 p-2',
        ' border-0 text-start border-bottom border-gray-100 quick-action-button',
      )}
    >
      <div className="d-flex gap-2 align-items-center">
        <DAvatar title={getInitials(account.name)} />
        <div>
          <p className="mb-0 fw-bold">{account.name}</p>
          <small className="text-gray-500">{account.accountNumber}</small>
        </div>
      </div>
    </button>
  );
}
