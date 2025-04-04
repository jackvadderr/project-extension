import { EventCardProps } from '@/types/EventCardProps';

const EventCard = ({ title, location, status, date }: EventCardProps) => {
  return (
    <div className={`p-4 border rounded-lg ${status === "ongoing" ? "bg-red-100" : "bg-blue-100"}`}>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-600">{location}</p>
      <p className="text-gray-500">{new Date(date).toLocaleDateString()}</p> {/* Exibindo a data */}
      <div className="mt-2 text-sm">
        <span className={`px-2 py-1 rounded ${status === "ongoing" ? "bg-red-500 text-white" : "bg-blue-500 text-white"}`}>
          {status === "ongoing" ? "🔴 Em andamento" : status === "scheduled" ? "📅 Agendado" : status === "canceled" ? "❌ Cancelado" : "✔️ Concluído"}
        </span>
      </div>
    </div>
  );
};

interface EventListProps {
  events: EventCardProps[];
}

const EventListCard = ({ events }: EventListProps) => {
  return (
    <div className="grid gap-4">
      {events.map((event, index) => (
        <EventCard key={index} {...event} />
      ))}
    </div>
  );
};

export default EventListCard;
