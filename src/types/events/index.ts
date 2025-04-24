// src/types/events/index.ts
export enum EventType {
  WEDDING = 'wedding',
  BIRTHDAY = 'birthday',
  CORPORATE = 'corporate',
  OTHER = 'other'
}

export enum EventStatus {
  SCHEDULED = 'scheduled',
  COMPLETED = 'completed',
  CANCELED = 'canceled'
}

export interface EventFormData {
  name: string;
  description: string;
  event_date: string;
  event_time: string;
  location: string;
  max_capacity: number;
  event_type: EventType;
  duration: number;
  rent: number;
  status: EventStatus;
  client_id: string;
}

export enum EventDetailState {
  EXPANDED = 'expanded',
  COLLAPSED = 'collapsed'
}