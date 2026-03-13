import { DIcon } from '@dynamic-framework/ui-react';
import classNames from 'classnames';
import { useCallback } from 'react';

import type { DepositAccount } from '../services/interface';
import { useAppDispatch } from '../store/hooks';
import { setCurrentStep, setSelectedAccount } from '../store/slice';

type Props = {
  depositAccount: DepositAccount;
};

export default function AccountListItem({ depositAccount }: Props) {
  const dispatch = useAppDispatch();

  const handleSelectContact = useCallback(() => {
    dispatch(setSelectedAccount(depositAccount));
    dispatch(setCurrentStep('details'));
  }, [depositAccount, dispatch]);

  return (
    <div className="border-bottom border-gray-50 py-1">
      <button
        type="button"
        onClick={handleSelectContact}
        className={classNames(
          'd-flex gap-2 align-items-center justify-content-between w-100 p-2',
          'border-0 text-start rounded-2 bg-transparent hover:bg-gray-50 quick-action-button',
        )}
      >
        <div>
          <p className="mb-0 fw-bold">{depositAccount.name}</p>
          <small className="text-gray-500">{depositAccount.accountNumber}</small>
        </div>
        <DIcon
          className="ms-auto"
          color="primary"
          icon="ChevronRight"
        />
      </button>
    </div>
  );
}
