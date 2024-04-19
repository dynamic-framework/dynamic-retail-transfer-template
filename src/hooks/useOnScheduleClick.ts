import { useState } from 'react';

import { useDPortalContext } from '@dynamic-framework/ui-react';

export default function useOnScheduleClick(originProductAmount: number, amount?: number) {
  const { openPortal } = useDPortalContext();
  const [isScheduled, setIsScheduled] = useState(false);

  const onScheduleClick = () => {
    if (
      !isScheduled
        && (amount && (amount > 0 && amount <= originProductAmount))
    ) {
      openPortal('schedule', {
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
