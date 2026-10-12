'use client';

import { ThemeProvider } from '@/providers/theme-provider';
import { LocaleProvider } from '@/providers/locale-provider';
import { Locale } from '@/types';

type Props = {
  children: Readonly<React.ReactNode>;
  locale: Locale;
};

const Providers = ({ children, locale }: Props) => {
  return (
    <LocaleProvider locale={locale}>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </LocaleProvider>
  );
};

export default Providers;
