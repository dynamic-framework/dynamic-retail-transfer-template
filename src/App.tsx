import { useDContext } from '@dynamic-framework/ui-react';
import { useEffect, useMemo } from 'react';

import Confirmation from './components/Confirmation';
import OngoingTransfer from './components/OngoingTransfer';
import Steps from './components/Steps';
import TransferPanel from './components/TransferPanel';
import TransferResult from './components/TransferResult';
import { CONTEXT_CONFIG } from './config/widgetConfig';
import { useAppSelector } from './store/hooks';
import { getCurrentStep } from './store/selectors';

const STEPS = {
  init: TransferPanel,
  details: OngoingTransfer,
  confirmation: Confirmation,
  voucher: TransferResult,
};

export default function App() {
  const { setContext } = useDContext();
  const currentStep = useAppSelector(getCurrentStep);

  const CurrentStep = useMemo(
    () => STEPS[currentStep],
    [currentStep],
  );

  useEffect(() => {
    setContext(CONTEXT_CONFIG);
  }, [setContext]);

  return (
    <div className="container">
      <Steps />
      <div className="mx-auto col-xl-6">
        <CurrentStep />
      </div>
    </div>
  );
}
