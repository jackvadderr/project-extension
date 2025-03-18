interface StatusIndicatorProps {
    status: "scheduled" | "ongoing" | "canceled";
  }
  
  const statusColors = {
    scheduled: "bg-blue-500",
    ongoing: "bg-green-500",
    canceled: "bg-red-500",
  };
  
  const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
    return (
      <span
        className={`inline-block w-3 h-3 rounded-full ${statusColors[status]}`}
      ></span>
    );
  };
  
  export default StatusIndicator;
  