export interface EventFormData {
  name: string;
  description?: string;
  start_date: string;
  end_date: string;
  location: string;
  max_capacity: number;
  responsible?: string;
  event_type?: string;
  privacy?: string;
  duration?: number;
  tags?: string;
  event_code?: string;
  budget?: number;
  notes?: string;
}
