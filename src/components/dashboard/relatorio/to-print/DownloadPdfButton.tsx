// components/common/DownloadPdfButton.tsx
import { AiFillFilePdf } from "react-icons/ai";
import { PDFDownloadLink } from "@react-pdf/renderer";

interface DownloadPdfButtonProps {
  document: JSX.Element;
  fileName: string;
}

export default function DownloadPdfButton({
                                            document,
                                            fileName,
                                          }: DownloadPdfButtonProps) {
  return (
    <PDFDownloadLink
      document={document}
      fileName={fileName}
      className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-600 transition"
    >
      {({ loading }) =>
        loading ? (
          "Gerando PDF..."
        ) : (
          <>
            <AiFillFilePdf className="w-5 h-5" />
            <span>Baixar PDF</span>
          </>
        )
      }
    </PDFDownloadLink>
  );
}
