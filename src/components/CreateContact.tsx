import { Formik } from 'formik';
import {
  MButton,
  MFormikInput,
  MFormikInputSelect,
} from '@dynamic-framework/ui-react';
import * as Yup from 'yup';

import { useTranslation } from 'react-i18next';
import useBanksEffect from '../services/hooks/useBanksEffect';
import useCreateContact from '../services/hooks/useCreateContact';
import { useAppDispatch } from '../store/hooks';
import { setSelectedContact, setView } from '../store/slice';
import { Bank, Contact } from '../services/interface';

const NewContactSchema = Yup.object().shape({
  name: Yup.string().required(),
  targetDNI: Yup.string().required(),
  accountNumber: Yup.string().required(),
});

export default function CreateContact() {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { loading: loadingBanks, banks } = useBanksEffect();
  const { callback: createContact } = useCreateContact();
  return (
    <Formik
      initialValues={{
        name: '',
        targetDNI: '',
        accountNumber: '',
        targetBank: banks[0],
      }}
      validationSchema={NewContactSchema}
      onSubmit={(values) => {
        const newContact = createContact({
          name: values.name,
          accountNumber: values.accountNumber,
          bank: values.targetBank.name,
          image: `https://ui-avatars.com/api/?name=${values.name}`,
        } as Contact);
        dispatch(setSelectedContact(newContact));
        dispatch(setView('transfer'));
      }}
      enableReinitialize
    >
      {(
        {
          handleSubmit,
        },
      ) => (
        <form onSubmit={handleSubmit}>
          <div className="d-flex flex-column gap-3 px-3 py-4 rounded mb-3 bg-white shadow-sm">
            <MFormikInput
              mId="name"
              name="name"
              label={t('createContact.name')}
              placeholder={t('createContact.namePlaceholder')}
            />
            <MFormikInput
              mId="targetDNI"
              name="targetDNI"
              label={t('createContact.dni')}
              placeholder={t('createContact.dniPlaceholder')}
            />
            <MFormikInputSelect
              mId="targetBank"
              name="targetBank"
              label={t('createContact.bank')}
              placeholder="Selecciona banco"
              options={banks}
              labelExtractor={(option: Bank) => option.name}
              valueExtractor={(option: Bank) => option.id}
              isLoading={loadingBanks}
            />
            <MFormikInput
              mId="accountNumber"
              name="accountNumber"
              label={t('createContact.accountNumber')}
              placeholder={t('createContact.accountNumberPlaceholder')}
            />
            <MFormikInput
              mId="aliasAccount"
              name="aliasAccount"
              label={t('createContact.alias')}
              placeholder={t('createContact.aliasPlaceholder')}
            />
            <MButton
              className="align-self-center"
              id="saveContact"
              text={t('button.save')}
              isPill
              theme="primary"
              type="submit"
            />
          </div>
        </form>
      )}
    </Formik>
  );
}
