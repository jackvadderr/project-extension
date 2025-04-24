// src/hooks/useEventExpansion.ts

import { useState, useCallback } from 'react';

export const useEventExpansion = () => {
  const [expandedEventId, setExpandedEventId] = useState<number | null>(null);

  const toggleEventExpansion = useCallback((eventId: number) => {
    setExpandedEventId(current => current === eventId ? null : eventId);
  }, []);

  const isEventExpanded = useCallback((eventId: number): boolean => {
    return expandedEventId === eventId;
  }, [expandedEventId]);

  return {
    expandedEventId,
    toggleEventExpansion,
    isEventExpanded
  };
};