import { Event } from "@/types/Event";
import EventItem from "./EventItem";

interface EventListProps {
  events: Event[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  return (
    <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
      <thead>
        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
          <th className="p-3 text-left">Nome</th>
          <th className="p-3 text-left">Local</th>
          <th className="p-3 text-left">Data</th>
          <th className="p-3 text-left">Organizador</th>
          <th className="p-3 text-center">Capacidade</th>
          <th className="p-3 text-center">Status</th>
        </tr>
      </thead>
      <tbody className="text-gray-600 text-sm font-light">
        {events.map((event) => (
          <EventItem key={event.id} event={event} />
        ))}
      </tbody>
    </table>
  );
};

export default EventList;
