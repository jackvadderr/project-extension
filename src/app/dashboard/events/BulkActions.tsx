// src/components/dashboard/events/BulkActions.tsx
"use client";

interface BulkActionsProps {
  onDelete: () => void;
  onMarkAsCompleted: () => void;
  selectedCount: number;
}

export default function BulkActions({
                                      onDelete,
                                      onMarkAsCompleted,
                                      selectedCount
                                    }: BulkActionsProps) {
  return (
    <div className="mb-4 p-3 bg-blue-50 rounded-lg flex justify-between items-center">
      <span className="text-blue-800 font-medium">
        {selectedCount} {selectedCount === 1 ? 'evento selecionado' : 'eventos selecionados'}
      </span>
      <div className="flex gap-2">
        <button
          onClick={onMarkAsCompleted}
          className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 transition-colors text-sm"
        >
          Marcar como concluído
        </button>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors text-sm"
        >
          Excluir selecionados
        </button>
      </div>
    </div>
  );
}
