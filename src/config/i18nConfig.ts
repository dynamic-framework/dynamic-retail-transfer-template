/* eslint-disable @typescript-eslint/no-floating-promises */
import { configureI18n } from '@dynamic-framework/ui-react';
import { SITE_LANG } from './widgetConfig';

import es from '../locales/es.json';
import en from '../locales/en.json';

const resources = {
  es: { translation: es },
  en: { translation: en },
};

configureI18n(resources, { lng: SITE_LANG });
