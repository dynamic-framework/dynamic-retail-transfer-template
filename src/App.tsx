import { useDContext } from '@dynamic-framework/ui-react';
import { useEffect } from 'react';

import Gateway from './components/Gateway';
import { CONTEXT_CONFIG } from './config/widgetConfig';

export default function App() {
  const { setContext } = useDContext();

  useEffect(() => {
    setContext(CONTEXT_CONFIG);
  }, [setContext]);

  return (
    <div className="mx-auto col-xl-6">
      <Gateway />
    </div>
  );
}
