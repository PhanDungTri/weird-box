import { useEffect } from "react";
import socket from "../services/socket";

export const useListenServerEvent = (...[ev, listener]: Parameters<typeof socket.on>): void => {
  useEffect(() => {
    socket.on(ev, listener);
    return () => void socket.off(ev, listener);
  }, []);
};
