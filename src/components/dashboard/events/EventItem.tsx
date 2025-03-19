import { Event } from "@/types/Event";
import StatusIndicator from "./StatusIndicator";
import { format } from "date-fns";

interface EventItemProps {
  event: Event;
}

const EventItem: React.FC<EventItemProps> = ({ event }) => {
  const formattedDate = format(new Date(event.date), "dd/MM/yyyy");
  return (
    <tr className="border-b hover:bg-gray-100 transition">
      <td className="p-3">{event.name}</td>
      <td className="p-3">{event.location}</td>
      <td className="p-3">{formattedDate}</td>
      <td className="p-3">{event.organizer}</td>
      <td className="p-3 text-center">{event.max_capacity}</td>
      <td className="p-3 text-center">
        <StatusIndicator status={event.status} />
      </td>
    </tr>
  );
};

export default EventItem;
