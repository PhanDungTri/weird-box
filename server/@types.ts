import { EventsFromServer } from "../shared/@types";
import { SERVER_EVENT_NAME } from "../shared/constants";

export type ServerEventPayloads = Parameters<EventsFromServer[SERVER_EVENT_NAME]>;
