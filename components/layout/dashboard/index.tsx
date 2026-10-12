'use client';

import * as React from 'react';
import { SidebarInset } from '@/components/ui/sidebar';
import { Topbar } from '@/components/layout/dashboard/topbar';
import { NavigationSidebar } from '@/components/layout/dashboard/sidebar';

type Props = {
  children: Readonly<React.ReactNode>;
};

function DashboardContent({ children }: Props) {
  return (
    <NavigationSidebar.Provider>
      <NavigationSidebar.Content />

      <SidebarInset className="flex flex-col flex-1 min-w-0 min-h-screen">
        <header className="sticky top-0 z-30 w-full bg-background">
          <Topbar />
        </header>

        {/* Ana Sayfa İçeriği */}
        <main className="flex-1 p-0  overflow-y-auto">{children}</main>
      </SidebarInset>
    </NavigationSidebar.Provider>
  );
}

export default DashboardContent;
