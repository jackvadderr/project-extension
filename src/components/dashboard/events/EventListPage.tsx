// app/components/dashboard/events/EventListPage.tsx
"use client";

import AddEventButton from "@/components/dashboard/events/AddEventButton";
import EventList from "@/components/dashboard/events/EventList";
import SearchBar from "@/components/dashboard/events/SearchBar";
import { useState } from "react";
import { Event } from "@/types/Event";
import EventForm from "@/components/dashboard/events/EventForm";

interface EventListPageProps {
  initialEvents: Event[];
}

const EventListPage: React.FC<EventListPageProps> = ({ initialEvents }) => {
  const [events, setEvents] = useState(initialEvents);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddEvent = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <SearchBar placeholder="Buscar evento..." />
        <AddEventButton onClick={handleAddEvent} />
      </div>

      {events.length > 0 ? (
        <EventList events={events} />
      ) : (
        <p>Nenhum evento encontrado.</p>
      )}

      {/* Modal de Cadastro de Evento */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Cadastrar Evento</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                &times;
              </button>
            </div>
            <EventForm onCancel={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
};

export default EventListPage;