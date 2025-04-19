export interface BaseEvent {
  id: number;
  name: string;
}

export interface Event extends BaseEvent{
  location: string;
  date: string;
  status: EventStatus;
  max_capacity: number;
  event_type: string;
  description?: string;
  duration?: number;
  rent: number;
  client_id: string;
}

export type EventStatus = 'scheduled' | 'ongoing' | 'canceled' | 'completed' | 'indefinido';
