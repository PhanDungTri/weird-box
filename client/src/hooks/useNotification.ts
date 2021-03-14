import generateUniqueId from "../../../shared/src/utils/generateUniqueId";
import { NotificationProps, StyleVariant } from "../@types";
import { createSharedStateHook } from "./createSharedStateHook";

type NotificationHook = {
  notify: (variant: StyleVariant, timeout?: number) => (message: string) => void;
  notifications: NotificationProps[];
};

const accessNotificationList = createSharedStateHook<NotificationProps[]>([]);

const useNotification = (): NotificationHook => {
  const [notifications, setNotifications] = accessNotificationList();

  const notify = (variant: StyleVariant, timeout = 2000) => (message: string) => {
    const newNoti: NotificationProps = { id: generateUniqueId(), variant, message };

    if (notifications.length >= 3) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [oldestNoti, ...remains] = notifications;
      setNotifications([...remains, newNoti]);
    } else setNotifications([...notifications, newNoti]);

    setTimeout(() => setNotifications((list) => list.filter((n) => n.id !== newNoti.id)), timeout);
  };

  return { notify, notifications };
};

export default useNotification;
