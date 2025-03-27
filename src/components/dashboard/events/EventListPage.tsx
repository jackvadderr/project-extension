"use client";

import { useState } from "react";
import { Event } from "@/types/Event";
import EventList from "./EventList";
import EventForm from "./EventForm";
import AddEventButton from "./AddEventButton";
import SearchBar from "./SearchBar";

interface EventListPageProps {
  initialEvents: Event[];
  createEventAction: (eventData: Omit<Event, 'id'>) => Promise<Event>;
}

export default function EventListPage({
                                        initialEvents,
                                        createEventAction
                                      }: EventListPageProps) {
  const [events, setEvents] = useState(initialEvents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 10;

  const handleAddEvent = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleCreateEvent = async (formData: any) => {
    try {
      const newEvent = await createEventAction({
        name: formData.name,
        location: formData.location,
        date: formData.start_date,
        organizer: formData.responsible,
        max_capacity: formData.max_capacity,
        status: 'scheduled'
      });

      setEvents(prev => [...prev, newEvent]);
      handleCloseModal();
    } catch (error) {
      console.error("Failed to create event:", error);
    }
  };

  const filteredEvents = events.filter(event =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    event.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);

  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center mb-5">
        <SearchBar
          placeholder="Buscar evento..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <AddEventButton onClick={handleAddEvent} />
      </div>

      {currentEvents.length > 0 ? (
        <EventList events={currentEvents} />
      ) : (
        <p>Nenhum evento encontrado.</p>
      )}

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
        >
          Anterior
        </button>
        <span>Página {currentPage} de {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
        >
          Próxima
        </button>
      </div>

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
            <EventForm
              onCancel={handleCloseModal}
              onSubmit={handleCreateEvent}
            />
          </div>
        </div>
      )}
    </div>
  );
}
