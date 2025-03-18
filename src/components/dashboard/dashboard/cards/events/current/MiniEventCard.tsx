import EventProgressBar from "./EventProgressBar";
import EventStatus from "./EventStatus";

interface MiniEventCardProps {
  name: string;
  totalParticipants: number;
  confirmedParticipants: number;
  status: "Em andamento" | "Cancelado" | "Em breve";
  progress?: number; // Apenas para eventos "Em andamento"
}

const MiniEventCard = ({ name, totalParticipants, confirmedParticipants, status, progress = 0 }: MiniEventCardProps) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-64">
      <h3 className="text-sm font-semibold">{name}</h3>
      <p className="text-xs text-gray-500">{confirmedParticipants} de {totalParticipants} participantes confirmados</p>

      <div className="mt-2 flex items-center justify-between">
        <EventStatus status={status} />
        <a href="#" className="text-xs text-purple-600 font-semibold hover:underline">
          Ver mais detalhes
        </a>
      </div>

      {status === "Em andamento" && <EventProgressBar progress={progress} />}
    </div>
  );
};

export default MiniEventCard;