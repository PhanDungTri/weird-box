import { memo } from "react";
import socket from "../../../services/socket";
import SpellAnimation from "../SpellAnimation";
import Status from "../Status";
import Hand from "./Hand";

const Player = (): JSX.Element => {
  return (
    <>
      <div>
        <Status id={socket.id} horizontal />
        <Hand />
      </div>
      <SpellAnimation scale={4} id={socket.id} />
    </>
  );
};

export default memo(Player);
