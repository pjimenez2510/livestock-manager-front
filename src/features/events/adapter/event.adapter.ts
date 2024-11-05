import { ReactCalendarEvent } from "../interfaces/event-react-calendar.interface";
import { Event } from "../interfaces/event.interface";

export class EventAdapter {
  static toReactCalendarEvent(event: Event): ReactCalendarEvent {
    return {
      id: event.id,
      title: event.title,
      description: event.description,
      color: event.color,
      start: event.startDate,
      end: event.endDate,
    };
  }

  static toReactCalendarEvents(events: Event[]): ReactCalendarEvent[] {
    return events.map((event) => EventAdapter.toReactCalendarEvent(event));
  }
}
