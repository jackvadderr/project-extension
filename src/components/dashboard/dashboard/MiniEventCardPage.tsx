import MiniEventCard from './cards/events/current/MiniEventCard';

const MiniEventCardPage = ({ events = [] }) => {
  return (
    <div className="p-4">
      {events.length === 0 ? (
        <p className="text-gray-500 text-sm text-center py-4 italic">
          Nenhum evento em andamento.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {events.map((event: any, index: number) => {
            const progress = event.totalParticipants > 0
              ? Math.round((event.confirmedParticipants / event.totalParticipants) * 100)
              : 0;

            return (
              <MiniEventCard
                key={index}
                name={event.name}
                status={event.status}
                progress={progress}
                location={event.location}
                date={event.event_date}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MiniEventCardPage;
