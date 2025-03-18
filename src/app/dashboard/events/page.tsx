"use client"
import AddEventButton from "@/components/dashboard/events/AddEventButton";
import EventList from "@/components/dashboard/events/EventList";
import SearchBar from "@/components/dashboard/events/SearchBar";
import { useState } from "react";
import { Event } from "@/types/Event";

const initialEvents: Event[] = [
  { id: 1, name: "Churras do seu Jorge", location: "Porto Velho", date: "2025-06-15", organizer: "NA Eventos", status: "scheduled" },
  { id: 2, name: "Festa de aniversario", location: "Porto Velho", date: "2025-07-20", organizer: "NA Eventos", status: "ongoing" },
];

const EventListPage: React.FC = () => {
  const [events, setEvents] = useState(initialEvents);

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <SearchBar placeholder="Buscar evento..." />
        <div className="flex gap-2">
          <AddEventButton />
        </div>
      </div>
      {events.length > 0 ? (
        <EventList events={events} />
      ) : (
        <p>Nenhum evento encontrado.</p>
      )}    </div>
  );
};

export default EventListPage;