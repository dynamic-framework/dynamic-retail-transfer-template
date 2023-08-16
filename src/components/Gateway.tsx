import { useMemo } from 'react';
import { useAppSelector } from '../store/hooks';
import {
  getIsTransferred,
  getSelectedContact,
  getSelectedProduct,
} from '../store/selectors';
import TransferPanel from './TransferPanel';
import TransferResult from './TransferResult';
import OngoingTransfer from './OngoingTransfer';

export default function Gateway() {
  const selectedContact = useAppSelector(getSelectedContact);
  const selectedProduct = useAppSelector(getSelectedProduct);
  const selectedDestiny = useMemo(
    () => selectedContact || selectedProduct,
    [selectedContact, selectedProduct],
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
