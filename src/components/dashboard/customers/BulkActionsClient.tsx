"use client";

import React from "react";

interface BulkActionsClientProps {
  onDelete: () => void;
  onMarkAsInactive: () => void;
  selectedCount: number;
}

export default function BulkActionsClient({
                                            onDelete,
                                            onMarkAsInactive,
                                            selectedCount
                                          }: BulkActionsClientProps) {
  return (
    <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-full shadow-sm flex justify-between items-center">
      <span className="text-blue-800 font-medium text-lg">
        {selectedCount} {selectedCount === 1 ? 'cliente selecionado' : 'clientes selecionados'}
      </span>
      <div className="flex gap-2">
        <button
          onClick={onMarkAsInactive}
          className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors text-sm"
        >
          Marcar como inativo
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors text-sm"
        >
          Excluir selecionados
        </button>
      </div>
    </div>
  );
}
