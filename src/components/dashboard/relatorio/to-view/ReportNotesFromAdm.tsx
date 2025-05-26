import { StickyNote } from 'lucide-react';

export default function ReportNotesFromAdm({notes}: {notes?: string}) {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <StickyNote className="w-5 h-5" />
        Observações do Administrador
      </h2>

      <div className="bg-gray-100 p-4 rounded text-sm whitespace-pre-line">
        {notes}
      </div>
    </div>
  );
}
