export default function ReportFooter() {
  const generatedAt = new Date().toLocaleDateString('pt-BR');

  return (
    <div className="mt-12 text-sm text-gray-500 text-center border-t pt-4">
      Sistema de Gestão de Eventos — Relatório gerado em {generatedAt}
    </div>
  );
}
