import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import { GameMatchingStatus } from "../../../shared/@types";
import { SERVER_EVENT_NAME } from "../../../shared/constants";
import BoxOfCardsSprite from "url:../../assets/sprites/box_of_cards.png";
import IconSprites from "url:../../assets/sprites/icons.png";
import LoadingSpriteSheet from "url:../../assets/sprites/loading_animation.png";
import Logo from "url:../../assets/sprites/logo.png";
import { chosenLanguageAtom, routeAtom, soundAtom } from "../../atoms";
import CenterizedGrid from "../../components/CenterizedGrid";
import Page from "../../components/Page";
import Sprite from "../../components/Sprite";
import { ROUTE } from "../../constants";
import withSpriteLoading from "../../HOCs/withSpriteLoading";
import { useListenServerEvent } from "../../hooks";
import socket from "../../services/socket";
import FindingGame from "./FindingGame";
import GameConfirmDialog from "./GameConfirmDialog";
import Header from "./Header";
import Menu from "./Menu";
import PlayerNameInput from "./PlayerNameInput";
import Room from "./Room";

const Hub = (): JSX.Element => {
  const [sound] = useAtom(soundAtom);
  const [, changeRoute] = useAtom(routeAtom);
  const [isMatching, match] = useState(false);
  const [chosenLanguage] = useAtom(chosenLanguageAtom);

  useEffect(() => void socket.once(SERVER_EVENT_NAME.NewGame, () => changeRoute(ROUTE.InGame)), []);

  useListenServerEvent(SERVER_EVENT_NAME.UpdateGameMatchingStatus, (status: GameMatchingStatus) =>
    match(status !== "Canceled")
  );

  useListenServerEvent(SERVER_EVENT_NAME.FriendJoined, () => sound?.play("KnockDoor"));
  useListenServerEvent(SERVER_EVENT_NAME.FriendLeft, () => sound?.play("DoorClose"));
  useListenServerEvent(SERVER_EVENT_NAME.LeftRoom, () => sound?.play("DoorClose"));
  useListenServerEvent(SERVER_EVENT_NAME.JoinedRoom, () => sound?.play("KnockDoor"));

  return (
    <Page>
      <CenterizedGrid css={{ height: "100%", width: "100%" }}>
        <Header />
        <Sprite
          src={Logo}
          steps={1}
          size={[240, 55]}
          css={{ position: "relative" }}
          row={chosenLanguage === "vi" ? 0 : 1}
        />
        <PlayerNameInput />
        {isMatching ? (
          <FindingGame />
        ) : (
          <>
            <Menu />
            <Room />
          </>
        )}
        <GameConfirmDialog />
      </CenterizedGrid>
    </Page>
  );
};

export default withSpriteLoading(Hub, [IconSprites, LoadingSpriteSheet, Logo, BoxOfCardsSprite]);
