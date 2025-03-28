"use client";

import { EventFormData } from "@/types/EventFormData";
import { useState } from "react";

interface EventFormProps {
  onCancel: () => void;
  onSubmit: (formData: EventFormData) => Promise<void>;
}

export default function EventForm({ onCancel, onSubmit }: EventFormProps) {
  const [formData, setFormData] = useState<EventFormData>({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    location: "",
    max_capacity: 0,
    responsible: "",
    event_type: "",
    privacy: "public",
    duration: 0,
    tags: "",
    event_code: "",
    budget: 0,
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "max_capacity" || name === "duration" || name === "budget"
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg max-h-[calc(100vh-8rem)] overflow-y-auto"
    >
      <h2 className="text-2xl font-bold text-center mb-4">Cadastrar Evento</h2>

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
        {/* Data de Início */}
        <div>
          <label htmlFor="start_date" className="block text-sm font-medium text-gray-700">
            Data de Início*
          </label>
          <input
            type="datetime-local"
            id="start_date"
            name="start_date"
            value={formData.start_date}
            onChange={handleChange}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Data de Término */}
        <div>
          <label htmlFor="end_date" className="block text-sm font-medium text-gray-700">
            Data de Término*
          </label>
          <input
            type="datetime-local"
            id="end_date"
            name="end_date"
            value={formData.end_date}
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

      {/* Responsável */}
      <div>
        <label htmlFor="responsible" className="block text-sm font-medium text-gray-700">
          Responsável
        </label>
        <input
          type="text"
          id="responsible"
          name="responsible"
          value={formData.responsible}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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

        {/* Privacidade */}
        <div>
          <label htmlFor="privacy" className="block text-sm font-medium text-gray-700">
            Privacidade
          </label>
          <select
            id="privacy"
            name="privacy"
            value={formData.privacy}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="public">Público</option>
            <option value="private">Privado</option>
          </select>
        </div>
      </div>

      {/* Tags */}
      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
          Tags (separadas por vírgula)
        </label>
        <input
          type="text"
          id="tags"
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Código do Evento */}
      <div>
        <label htmlFor="event_code" className="block text-sm font-medium text-gray-700">
          Código do Evento
        </label>
        <input
          type="text"
          id="event_code"
          name="event_code"
          value={formData.event_code}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Orçamento */}
      <div>
        <label htmlFor="budget" className="block text-sm font-medium text-gray-700">
          Orçamento (R$)
        </label>
        <input
          type="number"
          id="budget"
          name="budget"
          min="0"
          step="0.01"
          value={formData.budget}
          onChange={handleChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Notas */}
      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
          Notas
        </label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Botões de Ação */}
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
          Cadastrar Evento
        </button>
      </div>
    </form>
  );
}
