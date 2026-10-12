'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Bell, ChevronDown, Plus, Search } from 'lucide-react';
import { type ClinicKey, clinics } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/dashboard/theme-toggle';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function Topbar() {
  const t = useTranslations();
  const [clinic, setClinic] = useState<ClinicKey>('all');
  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchFocused, setSearchFocused] = useState(false);
  const isSearchExpanded = searchFocused || searchQuery.length > 0;

  const current = clinics.find((c) => c.key === clinic);

  return (
    // 'w-full' ve sticky yapıyı koruyup çift padding çakışmasını engelliyoruz
    <div className="flex h-16 w-full items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md md:px-6 shrink-0">
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

        <ThemeToggle />

        <button className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted-foreground hover:bg-muted cursor-pointer transition-colors">
          <Bell className="h-[1.15rem] w-[1.15rem]" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive ring-2 ring-card" />
        </button>

        <Button className="gap-1.5 cursor-pointer">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Yeni Kayıt</span>
        </Button>
      </div>
    </div>
  );
}
