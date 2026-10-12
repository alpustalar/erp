import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { enMessages } from './messages/en';
import { trMessages } from './messages/tr';

const messagesByLocale = {
  tr: trMessages,
  en: enMessages,
} as const;

export default getRequestConfig(async ({ requestLocale }) => {
  const requestedLocale = await requestLocale;

  const locale = hasLocale(routing.locales, requestedLocale)
    ? requestedLocale
    : routing.defaultLocale;

  return {
    locale,
    messages: messagesByLocale[locale],
  };
});
