import { useDContext } from '@dynamic-framework/ui-react';
import { useEffect, useMemo } from 'react';

import OngoingTransfer from './components/OngoingTransfer';
import TransferPanel from './components/TransferPanel';
import TransferResult from './components/TransferResult';
import { CONTEXT_CONFIG, STEP } from './config/widgetConfig';
import { useAppSelector } from './store/hooks';
import { getCurrentStep } from './store/selectors';

const STEPS = {
  [STEP.init]: TransferPanel,
  [STEP.details]: OngoingTransfer,
  [STEP.voucher]: TransferResult,
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
    <div className="mx-auto col-xl-6">
      <CurrentStep />
    </div>
  );
}
