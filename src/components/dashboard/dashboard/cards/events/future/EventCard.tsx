import { EventCardProps } from '@/types/EventCardProps';

const EventCard = ({ title, location, status, date }: EventCardProps) => {
  const statusConfig = {
    ongoing: {
      label: "Em andamento",
      icon: "🔴",
      bg: "bg-red-100 text-red-700"
    },
    scheduled: {
      label: "Agendado",
      icon: "📅",
      bg: "bg-blue-100 text-blue-700"
    },
    canceled: {
      label: "Cancelado",
      icon: "❌",
      bg: "bg-gray-100 text-gray-500"
    },
    completed: {
      label: "Concluído",
      icon: "✔️",
      bg: "bg-green-100 text-green-700"
    }
  };

  const formattedDate = new Date(date).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });

  const statusStyles = statusConfig[status] || statusConfig.scheduled;

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:ring-1 hover:ring-blue-300 transition-all duration-200 p-4">
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600">{location}</p>
        <p className="text-sm text-gray-500">{formattedDate}</p>

        <div className="mt-2 flex items-center gap-2">
          <span className={`text-sm px-3 py-1 rounded-full font-medium flex items-center gap-1 ${statusStyles.bg}`}>
            <span>{statusStyles.icon}</span>
            <span>{statusStyles.label}</span>
          </span>
        </div>
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
