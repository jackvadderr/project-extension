import MiniEventCard from './cards/events/current/MiniEventCard';

const MiniEventCardPage = ({ events = [] }) => {
  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Eventos em andamento</h2>

      {events.length === 0 ? (
        <p className="text-gray-500">Nenhum evento em andamento.</p>
      ) : (
        <div className="grid gap-4">
          {events.map((event: any, index) => (
            <MiniEventCard
              key={index}
              name={event.name}
              totalParticipants={event.totalParticipants}
              confirmedParticipants={event.confirmedParticipants}
              status={event.status}
              progress={Math.round((event.confirmedParticipants / event.totalParticipants) * 100)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MiniEventCardPage;
