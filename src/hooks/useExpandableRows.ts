import { RowState } from '@/types/customer/commons';
import { useState, useCallback } from 'react';

export function useExpandableRows() {
  const [expandedRows, setExpandedRows] = useState<Record<string, RowState>>({});

  const toggleRow = useCallback((id: string) => {
    setExpandedRows(prev => ({
      ...prev,
      [id]: prev[id] === RowState.EXPANDED ? RowState.COLLAPSED : RowState.EXPANDED
    }));
  }, []);

  const isRowExpanded = useCallback((id: string) => {
    return expandedRows[id] === RowState.EXPANDED;
  }, [expandedRows]);

  return { toggleRow, isRowExpanded };
}