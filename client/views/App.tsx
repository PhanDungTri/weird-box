import produce from "immer";
import { useAtom } from "jotai";
import { RoomInfo, ClientInfo } from "../../shared/@types";
import { SERVER_EVENT_NAME } from "../../shared/constants";
import { roomAtom, routeAtom } from "../atoms";
import ROUTE from "../constants/ROUTE";
import { useListenServerEvent } from "../hooks";
import Game from "./Game";
import Hub from "./Hub";
import Test from "./Test";

const pages = {
  [ROUTE.InGame]: <Game />,
  [ROUTE.Hub]: <Hub />,
  [ROUTE.Test]: <Test />,
};

const App = (): JSX.Element => {
  const [route] = useAtom(routeAtom);
  const [, setRoom] = useAtom(roomAtom);

  useListenServerEvent(SERVER_EVENT_NAME.GetRoomInfo, (info: RoomInfo) => setRoom(info));

  useListenServerEvent(SERVER_EVENT_NAME.FriendJoined, (friend: ClientInfo) =>
    setRoom((room) =>
      produce(room, (draft) => {
        draft?.members.push(friend);
      })
    )
  );

  useListenServerEvent(SERVER_EVENT_NAME.FriendLeft, (id: string) =>
    setRoom((room) =>
      produce(room, (draft) => {
        if (draft) draft.members = draft?.members.filter((m) => m.id !== id);
      })
    )
  );

  return pages[route];
};

export default App;
