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
    <div className="row">
      <div className="offset-lg-2 col-lg-8 offset-xl-3 col-xl-6">
        <Gateway />
      </div>
    </div>
  );
}
