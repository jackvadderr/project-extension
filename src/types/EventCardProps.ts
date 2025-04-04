export interface EventCardProps {
  title: string;
  location: string;
  status: "scheduled" | "ongoing" | "canceled" | "completed";
  date: string;
}
