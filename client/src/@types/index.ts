export type PlayerInfo = {
  id: string;
  name: string;
};

export type StyleVariant = "Safe" | "Danger" | "Warning" | "Primary" | "Info";

export type NotificationProps = {
  id: string;
  message: string;
  variant: StyleVariant;
};
