export interface EventBase {
  title: string;
  description?: string;
  color: string;
  startDate: Date;
  endDate: Date;
}

export interface Event extends EventBase {
  id: number;
  createdAt?: Date;
}

export type EventCreate = EventBase;

export type EventUpdate = Partial<EventBase>;
