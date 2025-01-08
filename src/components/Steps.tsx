import { DStepper } from '@dynamic-framework/ui-react';
import { Step as DStep } from '@dynamic-framework/ui-react/dist/types/components/DStepper/DStepper';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Step } from '../config/widgetConfig';
import { useAppSelector } from '../store/hooks';
import { getCurrentStep } from '../store/selectors';

type InnerStep = { [key in Exclude<Step, 'voucher'>]: DStep };

const STEPS: InnerStep = {
  init: {
    label: 'steps.selection',
    value: 1,
  },
  details: {
    label: 'steps.detail',
    value: 2,
  },
  confirmation: {
    label: 'steps.confirmation',
    value: 3,
  },
};

export default function Steps() {
  const currentStep = useAppSelector(getCurrentStep);
  const { t } = useTranslation();

  const steps = useMemo(
    () => Object.values(STEPS).map((
      {
        label,
        value,
      },
    ) => (
      {
        label: t(label),
        value,
      })),
    [t],
  );

  if (currentStep === 'voucher') return null;

  return (
    <DStepper
      options={steps}
      currentStep={STEPS[currentStep].value}
      breakpoint="md"
      className="mb-4 mb-lg-8 d-flex align-self-start d-md-block"
    />
  );
}
