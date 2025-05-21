import { StickyNote } from 'lucide-react';

const mockNotes = `Observações gerais:
- Cliente XPTO demonstrou interesse em novos pacotes corporativos.
- Analisar possibilidade de desconto progressivo para clientes recorrentes.
- Investir em divulgação de eventos via redes sociais e parcerias.`;

export default function ReportNotesFromAdm() {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <StickyNote className="w-5 h-5" />
        Observações do Administrador
      </h2>

      <div className="bg-gray-100 p-4 rounded text-sm whitespace-pre-line">
        {mockNotes}
      </div>
    </div>
  );
}
