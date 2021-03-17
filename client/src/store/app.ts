import shallow from "zustand/shallow";
import create from "zustand/vanilla";
import { SOCKET_EVENT } from "../../../shared/src/@enums";
import generateUniqueId from "../../../shared/src/utils/generateUniqueId";
import { NotificationProps, StyleVariant } from "../@types";
import ROUTE from "../constants/ROUTE";
import socket from "../services/socket";

type AppState = {
  route: ROUTE;
  playerName: string;
  notifications: NotificationProps[];
  notify: (variant: StyleVariant) => (message: string) => void;
};

const appState = create<AppState>((set, get) => ({
  route: ROUTE.Hub,
  changeRoute: (route: ROUTE) => set({ route }),
  playerName: "player",
  changeName: (playerName: string) => set({ playerName }),
  notifications: [],
  notify: (variant: StyleVariant) => (message: string) => {
    const { notifications } = get();
    const newNoti: NotificationProps = { id: generateUniqueId(), variant, message };

    if (notifications.length >= 3) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const [oldestNoti, ...remains] = notifications;
      set({ notifications: [...remains, newNoti] });
    } else set({ notifications: [...notifications, newNoti] });
  },
}));

appState.subscribe(
  () => setTimeout(() => appState.setState((state) => ({ notifications: state.notifications.slice(0, 1) })), 2000),
  (state) => state.notifications,
  shallow
);

socket.on(SOCKET_EVENT.NewGame, () => appState.setState({ route: ROUTE.InGame }));
socket.on(SOCKET_EVENT.Error, appState.getState().notify("Danger"));
socket.on(SOCKET_EVENT.Info, appState.getState().notify("Info"));
