import liquidParser from '../utils/liquidParser';

export const SITE_LANG = liquidParser.parse('{{site.language}}');

// URLs
export const SITE_URL = liquidParser.parse('{{site.url}}');

// PATHs
export const DASHBOARD_PATH = liquidParser.parse('{{vars.dashboard-path}}');
