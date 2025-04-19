export default function BulkActions({
                                      onDelete,
                                      onMarkAsCompleted,
                                      selectedCount
                                    }: BulkActionsProps) {
  return (
    <div className="mb-4 p-3 bg-blue-50 rounded-full flex justify-between items-center">
      <span className="text-blue-800 font-medium text-lg">
        {selectedCount} {selectedCount === 1 ? 'evento selecionado' : 'eventos selecionados'}
      </span>
      <div className="flex gap-2">
        <button
          onClick={onMarkAsCompleted}
          className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition-colors text-sm"
        >
          Marcar como concluído
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
