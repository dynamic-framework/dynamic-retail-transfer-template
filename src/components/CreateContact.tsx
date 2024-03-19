import {
  DButton,
  DInput,
  DInputSelect,
} from '@dynamic-framework/ui-react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';

import useBanksEffect from '../services/hooks/useBanksEffect';
import useCreateContact from '../services/hooks/useCreateContact';
import { useAppDispatch } from '../store/hooks';
import { setSelectedContact, setView } from '../store/slice';

import type { Bank, Contact } from '../services/interface';

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
          values,
          errors,
          setFieldValue,
          handleSubmit,
        },
      ) => (
        <form onSubmit={handleSubmit}>
          <div className="d-flex flex-column gap-4 px-3 py-4 rounded mb-3 bg-white shadow-sm">
            <DInput
              id="name"
              name="name"
              label={t('createContact.name')}
              placeholder={t('createContact.namePlaceholder')}
              value={values.name}
              invalid={!!errors.name}
              onChange={(value) => setFieldValue('name', value)}
            />
            <DInput
              id="targetDNI"
              name="targetDNI"
              label={t('createContact.dni')}
              placeholder={t('createContact.dniPlaceholder')}
              value={values.targetDNI}
              invalid={!!errors.targetDNI}
              onChange={(value) => setFieldValue('targetDNI', value)}
            />
            <DInputSelect<Bank>
              id="targetBank"
              name="targetBank"
              label={t('createContact.bank')}
              options={banks}
              labelExtractor={(option: Bank) => option.name}
              valueExtractor={(option: Bank) => option.id}
              loading={loadingBanks}
              value={values.targetBank?.id}
              onChange={(value) => setFieldValue('targetBank', value)}
            />
            <DInput
              id="accountNumber"
              name="accountNumber"
              label={t('createContact.accountNumber')}
              placeholder={t('createContact.accountNumberPlaceholder')}
              value={values.accountNumber}
              invalid={!!errors.accountNumber}
              onChange={(value) => setFieldValue('accountNumber', value)}
            />
            <DInput
              id="aliasAccount"
              name="aliasAccount"
              label={t('createContact.alias')}
              placeholder={t('createContact.aliasPlaceholder')}
            />
            <DButton
              className="align-self-center"
              id="saveContact"
              text={t('button.save')}
              pill
              theme="primary"
              type="submit"
            />
          </div>
        </form>
      )}
    </Formik>
  );
}
