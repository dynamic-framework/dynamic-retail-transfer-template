import { useState } from 'react';

import { useDModalContext } from '@dynamic-framework/ui-react';

export default function useOnScheduleClick(originProductAmount: number, amount?: number) {
  const { openModal } = useDModalContext();
  const [isScheduled, setIsScheduled] = useState(false);

  const onScheduleClick = () => {
    if (
      !isScheduled
        && (amount && (amount > 0 && amount <= originProductAmount))
    ) {
      openModal('schedule', {
        payload: {
          onAccept: setIsScheduled,
          amount,
        },
      });
    } else {
      setIsScheduled(false);
    }
  };

  return {
    isScheduled,
    onScheduleClick,
  };
}
