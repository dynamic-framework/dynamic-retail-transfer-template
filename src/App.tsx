import CreateContact from './components/CreateContact';
import Gateway from './components/Gateway';

import { useAppSelector } from './store/hooks';
import { getView } from './store/selectors';

export default function App() {
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
