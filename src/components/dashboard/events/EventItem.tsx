import { Event } from "@/types/Event";
import StatusIndicator from "./StatusIndicator";

interface EventItemProps {
  event: Event;
}

const EventItem: React.FC<EventItemProps> = ({ event }) => {
  return (
    <tr className="border-b hover:bg-gray-100 transition">
      <td className="p-3">{event.name}</td>
      <td className="p-3">{event.location}</td>
      <td className="p-3">{event.date}</td>
      <td className="p-3">{event.organizer}</td>
      <td className="p-3 text-center">
        <StatusIndicator status={event.status} />
      </td>
    </tr>
  );
};

export default EventItem;
