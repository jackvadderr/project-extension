import EventProgressBar from "./EventProgressBar";
import EventStatus from "./EventStatus";

interface MiniEventCardProps {
  name: string;
  location: string;
  date: string;
  status: "Em andamento" | "Cancelado" | "Em breve";
  progress?: number;
}

const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const MiniEventCard = ({ name, location, date, status, progress = 0 }: MiniEventCardProps) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-64">
      <h3 className="text-sm font-semibold">{name}</h3>
      <p className="text-xs text-gray-500">{location}</p>
      {/*<p className="text-xs text-gray-500">{String(date)}</p>*/}
      <p className="text-xs text-gray-500">12/7/2024</p>

      <div className="mt-2 flex items-center justify-between">
        <EventStatus status={status} />
        {/*<a href="#" className="text-xs text-purple-600 font-semibold hover:underline">*/}
        {/*  Ver mais detalhes*/}
        {/*</a>*/}
      </div>

      {status === "Em andamento" && <EventProgressBar progress={progress} />}
    </div>
  );
};

export default MiniEventCard;
