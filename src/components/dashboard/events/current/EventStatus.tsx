interface EventStatusProps {
    status: "Em andamento" | "Cancelado" | "Em breve";
  }
  
  const statusColors = {
    "Em andamento": "text-green-600 bg-green-100",
    "Cancelado": "text-red-600 bg-red-100",
    "Em breve": "text-yellow-600 bg-yellow-100",
  };
  
  const EventStatus = ({ status }: EventStatusProps) => {
    return (
      <span className={`px-2 py-1 text-xs font-semibold rounded-md ${statusColors[status]}`}>
        {status}
      </span>
    );
  };
  
  export default EventStatus;
