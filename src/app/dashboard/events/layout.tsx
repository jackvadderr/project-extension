import { Suspense } from 'react';

interface EventsLayoutProps {
  children: React.ReactNode;
}

export default function EventsLayout({ children }: EventsLayoutProps) {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-100 rounded-2xl animate-pulse">
        <div className="p-4 sm:p-6">
          <div className="h-8 bg-gray-200 rounded-xl w-48 mb-4"></div>
          <div className="h-96 bg-gray-200 rounded-xl"></div>
        </div>
      </div>
    }>
      <div className="min-h-screen bg-gray-100 rounded-2xl">
        {children}
      </div>
    </Suspense>
  );
}