import type { ReactNode } from 'react';

interface EventsLayoutProps {
  children: ReactNode;
}

export default function EventsLayout({ children }: EventsLayoutProps) {
  return <div className="min-h-screen bg-gray-100">{children}</div>;
}
