import { useState, useCallback } from 'react';
import { EventFormData, EventType, EventStatus } from '@/types/events';

interface UseEventFormProps {
  initialData?: EventFormData;
  onSubmit: (data: EventFormData) => Promise<void>;
  onCancel: () => void;
}

export const useEventForm = ({ initialData, onSubmit, onCancel }: UseEventFormProps) => {
  const [formData, setFormData] = useState<EventFormData>({
    name: initialData?.name || '',
    description: initialData?.description || '',
    event_date: initialData?.event_date || '',
    event_time: initialData?.event_time || '',
    location: initialData?.location || '',
    max_capacity: initialData?.max_capacity || 0,
    event_type: initialData?.event_type || EventType.BIRTHDAY,
    duration: initialData?.duration || 0,
    rent: initialData?.rent || 0,
    status: initialData?.status || EventStatus.SCHEDULED,
    client_id: initialData?.client_id || '',
  });

  const handleChange = useCallback((
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: ['max_capacity', 'duration', 'rent'].includes(name)
        ? Number(value)
        : value,
    }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(formData);
  }, [formData, onSubmit]);

  return {
    formData,
    handleChange,
    handleSubmit,
    onCancel
  };
};