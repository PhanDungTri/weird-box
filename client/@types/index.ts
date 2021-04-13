import { NotificationVariant } from "../../shared/@types";

export type PlayerInfo = {
  id: string;
  name: string;
};

export type StyleVariant = "Primary" | NotificationVariant;

export type Notification = {
  id: string;
  message: string;
  variant: StyleVariant;
};
