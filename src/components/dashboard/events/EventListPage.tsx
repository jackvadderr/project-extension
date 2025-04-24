"use client";

import React, { useState } from "react";
import { Event } from "@/types/Event";
import { EventStatus, EventFormData } from "@/types/events";
import EventList from "./EventList";
import EventForm from "./EventForm";
import AddEventButton from "./AddEventButton";
import SearchBar from "./SearchBar";
import BulkActions from './BulkActions';
import { Customer } from '@/types/Customer';

interface EventListPageProps {
  initialEvents: Event[];
  createEventAction: (eventData: Omit<Event, 'id'>) => Promise<Event>;
  updateEventAction: (id: number, eventData: Partial<Event>) => Promise<Event>;
  deleteEventsAction: (ids: number[]) => Promise<void>;
  customers: Customer[];
}

export default function EventListPage({
                                        initialEvents,
                                        createEventAction,
                                        updateEventAction,
                                        deleteEventsAction,
                                        customers,
                                      }: EventListPageProps) {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEvents, setSelectedEvents] = useState<number[]>([]);
  const eventsPerPage = 10;

  const handleAddEvent = () => {
    setEditingEvent(null);
    setIsModalOpen(true);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingEvent(null);
  };

  const handleCreateEvent = async (formData: EventFormData) => {
    try {
      const newEvent = await createEventAction({
        name: formData.name,
        description: formData.description,
        duration: formData.duration,
        rent: formData.rent,
        location: formData.location,
        date: formData.event_date,
        event_type: formData.event_type,
        max_capacity: formData.max_capacity,
        status: formData.status,
        client_id: formData.client_id,
      });

      setEvents(prev => [...prev, newEvent]);
      handleCloseModal();
    } catch (error) {
      console.error("Failed to create event:", error);
    }
  };

  const handleUpdateEvent = async (formData: EventFormData) => {
    if (!editingEvent) return;

    try {
      const updatedEvent = await updateEventAction(editingEvent.id, {
        name: formData.name,
        description: formData.description,
        duration: formData.duration,
        rent: formData.rent,
        location: formData.location,
        date: formData.event_date,
        event_type: formData.event_type,
        max_capacity: formData.max_capacity,
        status: formData.status,
        client_id: formData.client_id,
      });

      setEvents(prev =>
        prev.map(event => event.id === updatedEvent.id ? updatedEvent : event)
      );
      handleCloseModal();
    } catch (error) {
      console.error("Failed to update event:", error);
    }
  };

  const handleDeleteEvents = async () => {
    if (selectedEvents.length === 0) return;

    try {
      await deleteEventsAction(selectedEvents);
      setEvents(prev => prev.filter(event => !selectedEvents.includes(event.id)));
      setSelectedEvents([]);
    } catch (error) {
      console.error("Failed to delete events:", error);
    }
  };

  const handleMarkAsCompleted = async () => {
    if (selectedEvents.length === 0) return;

    try {
      const updatedEvents = await Promise.all(
        selectedEvents.map(id =>
          updateEventAction(id, { status: EventStatus.COMPLETED })
        )
      );

      setEvents(prev =>
        prev.map(event => {
          const updatedEvent = updatedEvents.find(e => e.id === event.id);
          return updatedEvent || event;
        })
      );
      setSelectedEvents([]);
    } catch (error) {
      console.error("Failed to mark events as completed:", error);
    }
  };

  const handleSelectEvent = (id: number, isSelected: boolean) => {
    setSelectedEvents(prev =>
      isSelected
        ? [...prev, id]
        : prev.filter(eventId => eventId !== id)
    );
  };

  const handleSelectAll = (isSelected: boolean) => {
    const currentPageIds = currentEvents.map(event => event.id);

    if (isSelected) {
      setSelectedEvents(prev => [...new Set([...prev, ...currentPageIds])]);
    } else {
      setSelectedEvents(prev => prev.filter(id => !currentPageIds.includes(id)));
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

  const isAllSelected = currentEvents.length > 0 &&
    currentEvents.every(event => selectedEvents.includes(event.id));

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

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-5">
        <div className="w-full sm:w-auto flex-1">
          <SearchBar
            placeholder="Buscar por nome ou localização..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <AddEventButton onClick={handleAddEvent} />
      </div>

      {selectedEvents.length > 0 && (
        <BulkActions
          onDelete={handleDeleteEvents}
          onMarkAsCompleted={handleMarkAsCompleted}
          selectedCount={selectedEvents.length}
        />
      )}

      {currentEvents.length > 0 ? (
        <EventList
          events={currentEvents}
          onEdit={handleEditEvent}
          selectedEvents={selectedEvents}
          onSelectEvent={handleSelectEvent}
          onSelectAll={handleSelectAll}
          isAllSelected={isAllSelected}
          customers={customers}
        />
      ) : (
        <p className="text-center mt-4">Nenhum evento encontrado.</p>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-gray-600 transition-colors disabled:opacity-50 w-full sm:w-auto"
        >
          Anterior
        </button>
        <span className="text-center">Página {currentPage} de {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-500 text-white px-4 py-2 rounded-xl hover:bg-gray-600 transition-colors disabled:opacity-50 w-full sm:w-auto"
        >
          Próxima
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">
                {editingEvent ? "Editar Evento" : "Cadastrar Evento"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                &times;
              </button>
            </div>
            <EventForm
              onCancel={handleCloseModal}
              onSubmit={editingEvent ? handleUpdateEvent : handleCreateEvent}
              initialData={editingEvent ? {
                name: editingEvent.name,
                description: editingEvent.description || '',
                event_date: new Date(editingEvent.date).toISOString().split('T')[0],
                event_time: new Date(editingEvent.date).toTimeString().slice(0, 5),
                location: editingEvent.location,
                max_capacity: editingEvent.max_capacity,
                event_type: editingEvent.event_type,
                duration: editingEvent.duration || 0,
                rent: editingEvent.rent || 0,
                status: editingEvent.status,
                client_id: editingEvent.client_id,
              } : undefined}
              clients={customers}
            />
          </div>
        </div>
      )}
    </div>
  );
}