export interface Event {
    id: number;
    name: string;
    location: string;
    date: string;
    organizer: string;
    status: "scheduled" | "ongoing" | "canceled";
    max_capacity: number;
  }
  