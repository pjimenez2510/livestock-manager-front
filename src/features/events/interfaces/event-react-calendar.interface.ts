export interface ReactCalendarEvent {
  id: number;
  title: string;
  description?: string;
  color: string;
  start: Date;
  end: Date;
}
