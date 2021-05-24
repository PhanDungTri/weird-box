import { Howl } from "howler";
import produce from "immer";
import { useAtom } from "jotai";
import { useState } from "react";
import { RoomInfo, ClientInfo } from "../../shared/@types";
import { SERVER_EVENT_NAME } from "../../shared/constants";
import { roomAtom, routeAtom } from "../atoms";
import { ROUTE } from "../constants";
import { useListenServerEvent } from "../hooks";
import Game from "./Game";
import Hub from "./Hub";
import DoorKnockSound from "../assets/sounds/door_knock.mp3";
import DoorCloseSound from "../assets/sounds/door_close.mp3";
import Initiator from "./Initiator";
//import Test from "./Test";

const pages = {
  [ROUTE.InGame]: <Game />,
  [ROUTE.Hub]: <Hub />,
  [ROUTE.Test]: <div />,
  [ROUTE.Init]: <Initiator />,
};

const App = (): JSX.Element => {
  const [route] = useAtom(routeAtom);
  const [, setRoom] = useAtom(roomAtom);
  const [doorKnockSound] = useState(new Howl({ src: [DoorKnockSound] }));
  const [doorCloseSound] = useState(new Howl({ src: [DoorCloseSound] }));

  useListenServerEvent(SERVER_EVENT_NAME.GetRoomInfo, (info: RoomInfo) => setRoom(info));

  useListenServerEvent(SERVER_EVENT_NAME.FriendJoined, (friend: ClientInfo) => {
    doorKnockSound.play();
    setRoom((room) =>
      produce(room, (draft) => {
        draft?.members.push(friend);
      })
    );
  });

  useListenServerEvent(SERVER_EVENT_NAME.FriendLeft, (id: string, owner: string) => {
    doorCloseSound.play();
    setRoom((room) =>
      produce(room, (draft) => {
        if (draft) {
          draft.members = draft?.members.filter((m) => m.id !== id);
          draft.owner = owner;
        }
      })
    );
  });

  useListenServerEvent(SERVER_EVENT_NAME.LeftRoom, () => setRoom(null));

  return pages[route];
};

export default App;
