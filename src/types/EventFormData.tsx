// src/types/EventFormData.ts
export interface EventFormData {
  name: string;
  description?: string;
  event_date: string;
  event_time: string;
  location: string;
  max_capacity: number;
  event_type: string;
  duration?: number;
  rent: number;
  status: string;
}
