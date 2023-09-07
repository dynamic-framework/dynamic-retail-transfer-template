/* eslint-disable @typescript-eslint/no-floating-promises */
import { configureI18n, liquidParser } from '@dynamic-framework/ui-react';

import es from '../locales/es.json';
import en from '../locales/en.json';

const resources = {
  es: { translation: es },
  en: { translation: en },
};

const LANG = liquidParser.parse('{{site.language}}');

configureI18n(resources, { lng: LANG });
