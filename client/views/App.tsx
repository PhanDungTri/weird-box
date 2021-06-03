import produce from "immer";
import { useAtom } from "jotai";
import { lazy, Suspense } from "react";
import { ClientInfo, GameMatchingStatus, RoomInfo } from "../../shared/@types";
import { SERVER_EVENT_NAME } from "../../shared/constants";
import { roomAtom, routeAtom } from "../atoms";
import Loading from "../components/Loading";
import Page from "../components/Page";
import { ROUTE } from "../constants";
import { useListenServerEvent } from "../hooks";
import { centerizeStyle } from "../styles";
import ReconnectDialog from "./ReconnectDialog";
//import Test from "./Test";

const Game = lazy(() => import("./Game"));
const Hub = lazy(() => import("./Hub"));
const Initiator = lazy(() => import("./Initiator"));

const App = (): JSX.Element => {
  const [route, changeRoute] = useAtom(routeAtom);
  const [, setRoom] = useAtom(roomAtom);

  useListenServerEvent(SERVER_EVENT_NAME.GetRoomInfo, (info: RoomInfo) => setRoom(info));
  useListenServerEvent(SERVER_EVENT_NAME.LeftRoom, () => setRoom(null));

  useListenServerEvent(SERVER_EVENT_NAME.UpdateGameMatchingStatus, (status: GameMatchingStatus) => {
    if (status === "Canceled") changeRoute(ROUTE.Hub);
  });

  useListenServerEvent(SERVER_EVENT_NAME.FriendJoined, (friend: ClientInfo) =>
    setRoom((room) =>
      produce(room, (draft) => {
        draft?.members.push(friend);
      })
    )
  );

  useListenServerEvent(SERVER_EVENT_NAME.FriendLeft, (id: string, owner: string) =>
    setRoom((room) =>
      produce(room, (draft) => {
        if (draft) {
          draft.members = draft?.members.filter((m) => m.id !== id);
          draft.owner = owner;
        }
      })
    )
  );

  return (
    <>
      <Suspense
        fallback={
          <Page>
            <Loading css={centerizeStyle} scale={4} />{" "}
          </Page>
        }
      >
        {route === ROUTE.Init && <Initiator />}
        {route === ROUTE.Hub && <Hub />}
        {route === ROUTE.InGame && <Game />}
        {route === ROUTE.Test && <div />}
      </Suspense>
      <ReconnectDialog />
    </>
  );
};

export default App;
