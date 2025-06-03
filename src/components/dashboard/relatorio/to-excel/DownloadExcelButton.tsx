import { PiMicrosoftExcelLogoDuotone } from "react-icons/pi";

interface DownloadExcelButtonProps {
  onClick: () => void;
}

export default function DownloadExcelButton({ onClick }: DownloadExcelButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-xl shadow hover:bg-green-600 transition"
    >
      <PiMicrosoftExcelLogoDuotone className="w-5 h-5" />
      <span>Baixar Excel</span>
    </button>
  );
}
