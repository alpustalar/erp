import { defineRouting } from 'next-intl/routing';
import { defaultLocale, LOCALES } from '@/constants/locale';

export const routing = defineRouting({ locales: LOCALES, defaultLocale });
