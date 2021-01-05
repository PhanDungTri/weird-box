import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import socketState from "../state/socketState";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type EventHandler = (args: any) => void;

const useSocketEvent = (event: string, handler: EventHandler): void => {
  const socket = useRecoilValue(socketState);

  useEffect(() => {
    socket.on(event, handler);

    return () => {
      socket.off(event);
    };
  }, []);
};

export default useSocketEvent;
