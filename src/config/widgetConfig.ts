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

// PATHs
export const DASHBOARD_PATH = liquidParser.parse('{{vars.dashboard-path}}');

export const CONTEXT_CONFIG = {
  language: SITE_LANG,
  currency: VARS_CURRENCY,
} satisfies Partial<ComponentProps<typeof DContextProvider>>;
