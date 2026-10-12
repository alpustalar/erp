'use client';

import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import { Locale } from '@/types';
import { routing } from '@/i18n/routing';

// İngilizce modüler dosyalar
import { trMessages } from '@/i18n/messages/tr';
import { enMessages } from '@/i18n/messages/en';

// Modüler dosyaları dil bazında birleştiriyoruz
const LOCALE_MAP = {
  tr: trMessages,
  en: enMessages,
} as const;

type Props = {
  children: ReactNode;
  locale: Locale;
};

export const LocaleProvider = ({ children, locale }: Props) => {
  const currentLocale = (
    routing.locales.includes(locale as Locale) ? locale : routing.defaultLocale
  ) as keyof typeof LOCALE_MAP;

  return (
    <NextIntlClientProvider
      locale={currentLocale}
      messages={LOCALE_MAP[currentLocale]}
    >
      {children}
    </NextIntlClientProvider>
  );
};

export default LocaleProvider;
