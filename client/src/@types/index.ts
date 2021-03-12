export type PlayerInfo = {
  id: string;
  name: string;
};

export type StyleVariant = "Safe" | "Danger" | "Warning" | "Primary" | "Info";

export type NotificationPayload = { message: string; variant: StyleVariant };

export type NotificationProps = {
  id: string;
} & NotificationPayload;
