"use client";

import AddEventButton from "@/components/dashboard/events/AddEventButton";
import EventList from "@/components/dashboard/events/EventList";
import SearchBar from "@/components/dashboard/events/SearchBar";
import { useState } from "react";
import { Event } from "@/types/Event";
import Link from "next/link";

interface EventListPageProps {
  initialEvents: Event[];
}

const EventListPage: React.FC<EventListPageProps> = ({ initialEvents }) => {
  const [events, setEvents] = useState(initialEvents);

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <SearchBar placeholder="Buscar evento..." />
        <div className="flex gap-2">
        <Link href="/dashboard/events/register">
          <AddEventButton />
        </Link>
        </div>
      </div>
      {events.length > 0 ? (
        <EventList events={events} />
      ) : (
        <p>Nenhum evento encontrado.</p>
      )}
    </div>
  );
};

export default EventListPage;