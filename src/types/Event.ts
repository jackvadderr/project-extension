export interface Event {
  id: number;
  name: string;
  location: string;
  date: string;
  organizer: string;
  status: EventStatus;
  max_capacity: number;
}

export type EventStatus = 'scheduled' | 'ongoing' | 'canceled' | 'completed' | 'indefinido';
