import { useTranslation } from 'react-i18next';

import CreateContact from './components/CreateContact';
import Gateway from './components/Gateway';

import { useAppSelector } from './store/hooks';
import { getView } from './store/selectors';

export default function App() {
  const view = useAppSelector(getView);
  const { t } = useTranslation();

  return (
    <>
      <h1 className="fw-bold fs-4 mb-3">
        {t(view === 'transfer'
          ? 'title.transfer'
          : 'title.createContact')}
      </h1>
      <div className="row">
        <div className="offset-lg-2 col-lg-8 offset-xl-3 col-xl-6">
          {view === 'transfer' && <Gateway />}
          {view === 'newContact' && <CreateContact />}
        </div>
      </div>
    </>
  );
}
