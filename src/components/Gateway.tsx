import { useMemo } from 'react';
import { useAppSelector } from '../store/hooks';
import {
  getIsTransferred,
  getSelectedContact,
  getSelectedAccount,
} from '../store/selectors';
import TransferPanel from './TransferPanel';
import TransferResult from './TransferResult';
import OngoingTransfer from './OngoingTransfer';

export default function Gateway() {
  const selectedContact = useAppSelector(getSelectedContact);
  const selectedAccount = useAppSelector(getSelectedAccount);
  const selectedDestiny = useMemo(
    () => selectedContact || selectedAccount,
    [selectedContact, selectedAccount],
  );
  const isTransferred = useAppSelector(getIsTransferred);

  return (
    <>
      {!selectedDestiny && <TransferPanel />}
      {selectedDestiny && isTransferred && <TransferResult />}
      {selectedDestiny && !isTransferred && <OngoingTransfer />}
    </>
  );
}
