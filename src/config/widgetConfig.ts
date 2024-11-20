import { DContextProvider } from '@dynamic-framework/ui-react';
import { ComponentProps } from 'react';

import liquidParser from '../utils/liquidParser';

export const SITE_LANG = liquidParser.parse('{{site.language}}');

// URLs
export const SITE_URL = liquidParser.parse('{{site.url}}');

export const VARS_CURRENCY = {
  symbol: liquidParser.parse('{{vars.currency-symbol}}'),
  precision: Number(liquidParser.parse('{{vars.currency-precision}}')),
  separator: liquidParser.parse('{{vars.currency-separator}}'),
  decimal: liquidParser.parse('{{vars.currency-decimal}}'),
};

// Views
export const VIEW = {
  init: 'init',
  details: 'details',
  voucher: 'voucher',
};

export type View = keyof typeof VIEW;

export const VARS_FORMAT_DATE = liquidParser.parse('{{vars.format-date}}');

// PATHs
export const DASHBOARD_PATH = liquidParser.parse('{{vars.dashboard-path}}');
export const NEW_CONTACT_PATH = liquidParser.parse('{{vars.new-contact-path}}');

export const CONTEXT_CONFIG = {
  language: SITE_LANG,
  currency: VARS_CURRENCY,
} satisfies Partial<ComponentProps<typeof DContextProvider>>;
