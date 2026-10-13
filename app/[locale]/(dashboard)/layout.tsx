'use client';

import * as React from 'react';
import DashboardContent from '@/components/layout/dashboard';
import { NotificationProvider } from '@/components/notifications/notification-provider';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NotificationProvider><DashboardContent>{children}</DashboardContent></NotificationProvider>;
}
