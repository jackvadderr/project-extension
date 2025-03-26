"use client";

import { useState } from "react";
import { Event } from '@/types/Event';
import EventListPage from '@/components/dashboard/events/EventListPage';

interface EventListPageWrapperProps {
  initialEvents: Event[];
  createEventAction: (eventData: Omit<Event, 'id'>) => Promise<Event>;
}

export default function EventListPageWrapper({
                                               initialEvents,
                                               createEventAction
                                             }: EventListPageWrapperProps) {
  const [events, setEvents] = useState<Event[]>(initialEvents);

  const handleCreateEvent = async (eventData: Omit<Event, 'id'>): Promise<Event> => {
    try {
      const newEvent = await createEventAction(eventData);
      setEvents(prev => [...prev, newEvent]);
      return newEvent;
    } catch (err) {
      console.error('Error creating event:', err);
      throw err;
    }
  };

  return <EventListPage initialEvents={events} createEventAction={handleCreateEvent} />;
}
