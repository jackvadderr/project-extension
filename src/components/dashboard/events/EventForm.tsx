// src/components/dashboard/events/EventForm.tsx
"use client";

import { EventFormData } from "@/types/EventFormData";
import { useState, useEffect } from "react";
import { Customer } from '@/types/Customer';

interface EventFormProps {
  onCancel: () => void;
  onSubmit: (formData: EventFormData) => Promise<void>;
  initialData?: EventFormData;
  clients: Customer[];
}

export default function EventForm({ onCancel, onSubmit, initialData, clients }: EventFormProps) {
  const [formData, setFormData] = useState<Omit<EventFormData, 'id' | 'createdAt' | 'updatedAt'> >({
    name: initialData?.name || "",
    description: initialData?.description ?? "",
    event_date: initialData?.event_date || "",
    event_time: initialData?.event_time || "",
    location: initialData?.location || "",
    max_capacity: initialData?.max_capacity || 0,
    event_type: initialData?.event_type || "",
    duration: initialData?.duration || 0,
    rent: initialData?.rent || 0,
    status: initialData?.status || "scheduled",
    client_id: initialData?.client_id || "",
  });

  useEffect(() => {
    if (initialData) {
      console.log('Initial event_time:', initialData.event_time);

      const formattedDate = initialData.event_date
        ? new Date(initialData.event_date).toISOString().split('T')[0]
        : '';
      console.log('Formatted date:', formattedDate);

      const formattedTime = initialData.event_date
        ? new Date(initialData.event_date).toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit'
        })
        : '';

      console.log('Formatted time:', formattedTime);

      setFormData({
        name: initialData.name || "",
        description: initialData.description ?? "",
        event_date: formattedDate,
        event_time: formattedTime,
        location: initialData.location || "",
        max_capacity: initialData.max_capacity || 0,
        event_type: initialData.event_type || "",
        duration: initialData.duration || 0,
        rent: initialData.rent || 0,
        status: initialData.status || "scheduled",
        client_id: initialData.client_id || "",
      });
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "max_capacity" || name === "duration" || name === "rent"
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-md ">
      {/* Nome do Evento */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Nome do Evento*
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Descrição */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Descrição
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Data do Evento */}
        <div>
          <label htmlFor="event_date" className="block text-sm font-medium text-gray-700">
            Data do Evento*
          </label>
          <input
            type="date"
            id="event_date"
            name="event_date"
            value={formData.event_date}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Hora do Evento */}
        <div>
          <label htmlFor="event_time" className="block text-sm font-medium text-gray-700">
            Hora do Evento*
          </label>
          <input
            type="time"
            id="event_time"
            name="event_time"
            value={formData.event_time}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Localização */}
      <div>
        <label htmlFor="location" className="block text-sm font-medium text-gray-700">
          Localização*
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Capacidade Máxima */}
        <div>
          <label htmlFor="max_capacity" className="block text-sm font-medium text-gray-700">
            Capacidade Máxima*
          </label>
          <input
            type="number"
            id="max_capacity"
            name="max_capacity"
            min="0"
            value={formData.max_capacity}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Duração */}
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-gray-700">
            Duração (horas)
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            min="0"
            value={formData.duration}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Tipo de Evento */}
        <div>
          <label htmlFor="event_type" className="block text-sm font-medium text-gray-700">
            Tipo de Evento
          </label>
          <select
            id="event_type"
            name="event_type"
            value={formData.event_type}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecione...</option>
            <option value="workshop">Workshop</option>
            <option value="conference">Conferência</option>
            <option value="meeting">Reunião</option>
            <option value="seminar">Seminário</option>
          </select>
        </div>

        {/* Orçamento */}
        <div>
          <label htmlFor="rent" className="block text-sm font-medium text-gray-700">
            Orçamento (R\$)
          </label>
          <input
            type="number"
            id="rent"
            name="rent"
            min="0"
            step="0.01"
            value={formData.rent}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Status */}
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="scheduled">Agendado</option>
          <option value="completed">Concluído</option>
          <option value="canceled">Cancelado</option>
        </select>
      </div>

      {/* Cliente */}
      <div>
        <label htmlFor="client_id" className="block text-sm font-medium text-gray-700">
          Cliente*
        </label>
        <select
          id="client_id"
          name="client_id"
          value={formData.client_id}
          onChange={handleChange}
          required
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecione um cliente...</option>
          {clients && clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex justify-end gap-4 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
        >
          {initialData ? "Atualizar Evento" : "Cadastrar Evento"}
        </button>
      </div>
    </form>
  );
}
