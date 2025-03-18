interface EventCardProps {
    title: string;
    location: string;
    status: "live" | "upcoming";
    participants: number;
    maxParticipants: number;
  }
  
  const EventCard = ({ title, location, status, participants, maxParticipants }: EventCardProps) => {
    return (
      <div className={`p-4 border rounded-lg ${status === "live" ? "bg-red-100" : "bg-blue-100"}`}>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-gray-600">{location}</p>
        <div className="mt-2 text-sm">
          <span className={`px-2 py-1 rounded ${status === "live" ? "bg-red-500 text-white" : "bg-blue-500 text-white"}`}>
            {status === "live" ? "🔴 Em andamento" : "📅 Em Breve"}
          </span>
        </div>
        <p className="mt-2 text-sm">{participants} / {maxParticipants} participantes</p>
      </div>
    );
  };
  
  export default EventCard;
  