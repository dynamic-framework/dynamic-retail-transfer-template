import { DCard, useDContext } from '@dynamic-framework/ui-react';
import { useEffect, useMemo } from 'react';

import OngoingTransfer from './components/OngoingTransfer';
import TransferPanel from './components/TransferPanel';
import TransferResult from './components/TransferResult';
import { CONTEXT_CONFIG, VIEW } from './config/widgetConfig';
import { useAppSelector } from './store/hooks';
import { getCurrentView } from './store/selectors';

const VIEWS = {
  [VIEW.init]: TransferPanel,
  [VIEW.details]: OngoingTransfer,
  [VIEW.voucher]: TransferResult,
};

export default function App() {
  const { setContext } = useDContext();
  const view = useAppSelector(getCurrentView);

  const CurrentView = useMemo(
    () => VIEWS[view],
    [view],
  );

  useEffect(() => {
    setContext(CONTEXT_CONFIG);
  }, [setContext]);

  return (
    <div className="mx-auto col-xl-6">
      <DCard>
        <DCard.Body>
          <CurrentView />
        </DCard.Body>
      </DCard>
    </div>
  );
}
