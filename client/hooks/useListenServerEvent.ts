import { useEffect } from "react";
import socket from "../services/socket";

export const useListenServerEvent = (...args: Parameters<typeof socket.on>): void => {
  useEffect(() => {
    socket.on(args[0], args[1]);
    return () => void socket.off(args[0], args[1]);
  }, []);
};
