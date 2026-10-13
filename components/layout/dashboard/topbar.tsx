'use client';

import { useEffect, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { Bell, Check, ChevronDown, Computer, Languages, Moon, Search, Settings, Sun, UserRound } from 'lucide-react';
import { useTheme } from 'next-themes';
import { usePathname, useRouter } from '@/i18n/navigation';
import { type ClinicKey, clinics } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

export function Topbar() {
  const t = useTranslations();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();
  const [clinic, setClinic] = useState<ClinicKey>('all');
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [accent, setAccent] = useState('blue');
  const [contrast, setContrast] = useState('standard');
  const [persistSettings, setPersistSettings] = useState(false);
  const isSearchExpanded = searchFocused || searchQuery.length > 0;

  const current = clinics.find((c) => c.key === clinic);
  const accents = [
    { key: 'blue', label: 'Okyanus', color: 'oklch(0.55 0.19 255)' },
    { key: 'violet', label: 'Viyole', color: 'oklch(0.56 0.18 290)' },
    { key: 'teal', label: 'Teal', color: 'oklch(0.54 0.14 180)' },
    { key: 'amber', label: 'Amber', color: 'oklch(0.68 0.16 75)' },
    { key: 'rose', label: 'Gül', color: 'oklch(0.59 0.18 15)' },
  ];

  useEffect(() => {
    const saved = window.localStorage.getItem('erp-app-settings');
    if (!saved) return;

    try {
      const settings = JSON.parse(saved) as {
        accent?: string;
        contrast?: string;
      };
      if (settings.accent) setAccent(settings.accent);
      if (settings.contrast) setContrast(settings.contrast);
      setPersistSettings(true);
    } catch {
      window.localStorage.removeItem('erp-app-settings');
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.accent = accent;
    if (persistSettings) {
      window.localStorage.setItem('erp-app-settings', JSON.stringify({ accent, contrast }));
    }
  }, [accent, contrast, persistSettings]);

  useEffect(() => {
    document.documentElement.dataset.contrast = contrast;
  }, [contrast]);

  const updatePersistence = (enabled: boolean) => {
    setPersistSettings(enabled);
    if (enabled) {
      window.localStorage.setItem('erp-app-settings', JSON.stringify({ accent, contrast }));
    } else {
      window.localStorage.removeItem('erp-app-settings');
    }
  };

  return (
    // 'w-full' ve sticky yapıyı koruyup çift padding çakışmasını engelliyoruz
    <div className="flex h-16 w-full items-center gap-3 border-b border-border/80 bg-background/95 px-4 md:px-6 shrink-0">
      {/* Mobil Sidebar Açma/Kapama Butonu */}
      <SidebarTrigger className="lg:hidden shrink-0" />

      {/* Sayfa Başlığı ve Tarih */}
      <div className="flex flex-col leading-tight">
        <h1 className="text-base font-semibold text-foreground md:text-lg truncate">
          Genel Bakış
        </h1>
        <p className="hidden text-xs text-muted-foreground sm:block truncate">
          Salı, 9 Ağustos 2026
        </p>
      </div>

      {/* Klinik Seçici */}
      <div className="relative ml-2">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground hover:bg-muted cursor-pointer transition-colors"
        >
          <span className="h-2 w-2 rounded-full bg-primary shrink-0" />
          <span className="truncate">{current?.label}</span>
          <ChevronDown className="h-4 w-4 text-muted-foreground shrink-0" />
        </button>

        {open && (
          <div className="absolute left-0 top-11 z-30 w-52 overflow-hidden rounded-lg border border-border bg-popover p-1 shadow-lg">
            {clinics.map((c) => (
              <button
                key={c.key}
                onClick={() => {
                  setClinic(c.key);
                  setOpen(false);
                }}
                className={cn(
                  'flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted cursor-pointer transition-colors',
                  c.key === clinic
                    ? 'font-medium text-primary'
                    : 'text-popover-foreground'
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Sağ Taraf: Arama, Tema, Bildirim, Eylem */}
      <div className="ml-auto flex items-center gap-2">
        <div className="relative hidden md:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder={
              isSearchExpanded ? t('Common.searchPlaceholder') : t('Common.search')
            }
            aria-label={t('Common.searchPlaceholder')}
            className={cn(
              'origin-right rounded-lg border border-border bg-card py-2 pl-9 pr-3 text-sm outline-none placeholder:text-muted-foreground transition-[width,box-shadow,border-color] duration-300 ease-out focus:border-ring focus:ring-2 focus:ring-ring/20',
              isSearchExpanded ? 'w-72' : 'w-28'
            )}
          />
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setSettingsOpen((value) => !value)}
            aria-expanded={settingsOpen}
            aria-label="Uygulama ayarlarını aç"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            <Settings className="animate-settings-spin h-[1.15rem] w-[1.15rem]" />
          </button>

          {settingsOpen && (
            <div className="absolute right-0 top-12 z-40 w-72 rounded-xl border border-border bg-popover p-4 text-popover-foreground shadow-xl">
              <div className="flex items-start justify-between gap-3 border-b border-border pb-3">
                <div>
                  <p className="text-sm font-semibold">Uygulama ayarları</p>
                  <p className="mt-1 text-xs text-muted-foreground">Çalışma alanınızı kişiselleştirin.</p>
                </div>
                <Settings className="mt-0.5 size-4 text-primary" />
              </div>
              <div className="pt-4">
                <p className="mb-2 text-xs font-medium text-muted-foreground">Görünüm</p>
                <div className="grid grid-cols-3 gap-1 rounded-lg bg-muted p-1" role="radiogroup" aria-label="Görünüm modu">
                  {[
                    { key: 'light', label: 'Açık', icon: Sun },
                    { key: 'dark', label: 'Koyu', icon: Moon },
                    { key: 'system', label: 'Sistem', icon: Computer },
                  ].map((item) => {
                    const ModeIcon = item.icon;
                    return (
                      <button
                        key={item.key}
                        type="button"
                        role="radio"
                        aria-checked={theme === item.key}
                        aria-label={item.label}
                        title={item.key === 'system' ? 'Sistem' : item.label}
                        onClick={() => setTheme(item.key)}
                        className={cn(
                          'flex items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-[11px] transition-colors',
                          theme === item.key ? 'bg-card font-medium text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
                        )}
                      >
                        <ModeIcon data-icon="inline-start" />
                        {item.label}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="mt-4 border-t border-border pt-4">
                <div className="mb-2 flex items-center gap-2 text-xs font-medium text-muted-foreground"><Languages className="size-4 text-primary" />Uygulama dili</div>
                <div className="grid grid-cols-2 gap-1 rounded-lg bg-muted p-1" role="radiogroup" aria-label="Uygulama dili">
                  {[{ key: 'tr', label: 'Türkçe' }, { key: 'en', label: 'English' }].map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      role="radio"
                      aria-checked={locale === item.key}
                      onClick={() => {
                        if (locale === item.key) return;
                        router.replace(pathname, { locale: item.key as 'tr' | 'en' });
                      }}
                      className={cn('rounded-md px-2 py-1.5 text-xs transition-colors', locale === item.key ? 'bg-card font-medium text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground')}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-4 border-t border-border pt-4">
                <p className="mb-2 text-xs font-medium text-muted-foreground">Tema rengi</p>
                <div className="grid grid-cols-5 gap-2" role="radiogroup" aria-label="Tema rengi">
                  {accents.map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      role="radio"
                      aria-checked={accent === item.key}
                      aria-label={item.label}
                      title={item.label}
                      onClick={() => setAccent(item.key)}
                      className="group flex flex-col items-center gap-1.5 rounded-lg p-1.5 transition-colors hover:bg-muted"
                    >
                      <span
                        className={cn(
                          'flex size-8 items-center justify-center rounded-full ring-offset-2 ring-offset-popover transition-shadow',
                          accent === item.key && 'ring-2 ring-ring'
                        )}
                        style={{ backgroundColor: item.color }}
                      >
                        {accent === item.key && <Check className="size-4 text-white" />}
                      </span>
                      <span className="text-[10px] text-muted-foreground">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-4 border-t border-border pt-4">
                <p className="mb-2 text-xs font-medium text-muted-foreground">Kontrast</p>
                <div className="grid grid-cols-3 gap-1 rounded-lg bg-muted p-1" role="radiogroup" aria-label="Kontrast seviyesi">
                  {[
                    { key: 'soft', label: 'Yumuşak' },
                    { key: 'standard', label: 'Standart' },
                    { key: 'high', label: 'Yüksek' },
                  ].map((item) => (
                    <button
                      key={item.key}
                      type="button"
                      role="radio"
                      aria-checked={contrast === item.key}
                      onClick={() => setContrast(item.key)}
                      className={cn(
                        'rounded-md px-2 py-1.5 text-[11px] transition-colors',
                        contrast === item.key
                          ? 'bg-card font-medium text-foreground shadow-sm'
                          : 'text-muted-foreground hover:text-foreground'
                      )}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mt-4 border-t border-border pt-3">
                <label className="flex cursor-pointer items-center justify-between gap-3">
                  <span className="flex flex-col gap-1">
                    <span className="text-xs font-medium text-foreground">Ayarları hatırla</span>
                    <span className="text-[11px] text-muted-foreground">
                      {persistSettings
                        ? 'Ayarlarınız tüm oturumlarda uygulanır.'
                        : 'Ayarlarınız bu oturum için uygulanır.'}
                    </span>
                  </span>
                  <span className="relative flex size-9 shrink-0 items-center justify-center">
                    <input
                      type="checkbox"
                      checked={persistSettings}
                      onChange={(event) => updatePersistence(event.target.checked)}
                      aria-label="Ayarları tüm oturumlarda uygula"
                      className="peer sr-only"
                    />
                    <span className="pointer-events-none absolute h-5 w-9 rounded-full bg-muted transition-colors peer-checked:bg-primary peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2" />
                    <span className="pointer-events-none absolute left-1 size-3.5 rounded-full border border-border bg-background shadow-sm transition-transform peer-checked:translate-x-4" />
                  </span>
                </label>
              </div>
            </div>
          )}
        </div>

        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:bg-muted cursor-pointer transition-colors">
          <Bell className="h-[1.15rem] w-[1.15rem]" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive ring-2 ring-card" />
        </button>

        <Sheet open={profileOpen} onOpenChange={setProfileOpen}>
          <SheetTrigger
            render={
              <button
                type="button"
                aria-label="Profil panelini aç"
                className="flex h-9 items-center gap-2 rounded-lg border border-border bg-card px-2.5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
              />
            }
          >
            <span className="flex size-6 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
              ZK
            </span>
            <span className="hidden md:inline">Zeynep Kaya</span>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:max-w-md">
            <SheetHeader className="border-b border-border px-5 py-5">
              <SheetTitle>Profilim</SheetTitle>
              <SheetDescription>Hesap bilgilerinizi ve çalışma tercihlerinizi yönetin.</SheetDescription>
            </SheetHeader>
            <div className="flex flex-col gap-6 overflow-y-auto px-5 py-6">
              <div className="flex items-center gap-4">
                <div className="flex size-16 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
                  ZK
                </div>
                <div>
                  <p className="font-semibold text-foreground">Zeynep Kaya</p>
                  <p className="text-sm text-muted-foreground">Klinik yöneticisi</p>
                </div>
              </div>
              <div className="grid gap-3 rounded-xl border border-border bg-card p-4">
                <div>
                  <p className="text-xs font-medium text-muted-foreground">E-posta</p>
                  <p className="mt-1 text-sm text-foreground">zeynep.kaya@novaclinic.com</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-muted-foreground">Aktif klinik</p>
                  <p className="mt-1 text-sm text-foreground">Tüm klinikler</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-border bg-muted/40 p-4">
                <UserRound className="size-4 text-primary" />
                <p className="text-sm text-muted-foreground">Profil ayarları yakında burada olacak.</p>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
