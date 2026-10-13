'use client';

import * as React from 'react';
import { Settings2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';

type ManagedSheetProps = React.ComponentProps<typeof SheetContent> & {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  children: React.ReactNode;
};

export function ManagedSheet({ open, onOpenChange, title, description, children, className, ...props }: ManagedSheetProps) {
  const [dismissOnOutside, setDismissOnOutside] = React.useState(true);
  const [shake, setShake] = React.useState(false);
  const closeButtonRef = React.useRef(false);

  const handleOpenChange = (nextOpen: boolean) => {
    if (nextOpen || dismissOnOutside || closeButtonRef.current) {
      closeButtonRef.current = false;
      onOpenChange(nextOpen);
      return;
    }

    setShake(false);
    requestAnimationFrame(() => setShake(true));
    onOpenChange(true);
  };

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent
        {...props}
        className={cn(shake && 'animate-sheet-shake', className)}
      >
        <SheetHeader className="border-b border-border px-5 py-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <SheetTitle>{title}</SheetTitle>
              {description ? <SheetDescription>{description}</SheetDescription> : null}
            </div>
            <div className="flex items-center gap-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label={dismissOnOutside ? 'Pencere dışına tıklayınca kapatmayı kapat' : 'Pencere dışına tıklayınca kapatmayı aç'}
                title={dismissOnOutside ? 'Dışarı tıklayınca kapat' : 'Dışarı tıklayınca kapatma'}
                onClick={() => setDismissOnOutside((value) => !value)}
              >
                <Settings2 data-icon="inline-start" />
              </Button>
              <Button type="button" variant="ghost" size="icon" aria-label="Kapat" onClick={() => { closeButtonRef.current = true; onOpenChange(false); }}>
                <X data-icon="inline-start" />
              </Button>
            </div>
          </div>
          <p className="text-[11px] text-muted-foreground">
            {dismissOnOutside ? 'Pencere dışına tıklayınca kapanır.' : 'Pencere dışına tıklayınca kapanmaz; kapatmak için X kullanın.'}
          </p>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
}

export default ManagedSheet;
