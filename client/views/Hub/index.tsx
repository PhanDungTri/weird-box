import { centerizeContainerStyle, gridStyle, pageStyle } from "../../styles";
import GameConfirmDialog from "./GameConfirmDialog";
import Menu from "./Menu";
import PlayerNameInput from "./PlayerNameInput";

const Hub = (): JSX.Element => {
  return (
    <div css={[pageStyle, gridStyle, centerizeContainerStyle]}>
      <div>UNTITLED CARD GAME</div>
      <PlayerNameInput />
      <Menu />
      <GameConfirmDialog />
    </div>
  );
};

export default Hub;
