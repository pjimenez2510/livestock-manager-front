import { BaseHttpService } from "@/core/services/base-http.service";
import { Event, EventCreate, EventUpdate } from "../interfaces/event.interface";

export class EventService extends BaseHttpService<
  Event,
  EventCreate,
  EventUpdate,
  undefined
> {
  protected baseUrl: string = "/events";
}
