import { useDContext } from '@dynamic-framework/ui-react';
import { useEffect } from 'react';

import CreateContact from './components/CreateContact';
import Gateway from './components/Gateway';
import { CONTEXT_CONFIG } from './config/widgetConfig';
import { useAppSelector } from './store/hooks';
import { getView } from './store/selectors';

export default function App() {
    const { setContext } = useDContext();

    useEffect(() => {
        setContext(CONTEXT_CONFIG);
    }, [setContext]);

    const view = useAppSelector(getView);

    return (
        <div className="row">
            <div className="offset-lg-2 col-lg-8 offset-xl-3 col-xl-6">
                {view === 'transfer' && <Gateway />}
                {view === 'newContact' && <CreateContact />}
            </div>
        </div>
    );
}
