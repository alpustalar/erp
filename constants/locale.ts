export const LOCALES = ['tr', 'en'] as const;

export type Locale = (typeof LOCALES)[keyof typeof LOCALES];

export const defaultLocale = 'tr';
