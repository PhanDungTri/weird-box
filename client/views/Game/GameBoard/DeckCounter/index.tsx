import Sprite from "../../../../components/Sprite";
import DeckSprite from "../../../../assets/sprites/deck.png";
import { deckCounterStyle } from "./styles";

const DeckCounter = (): JSX.Element => {
  return <Sprite src={DeckSprite} size={[52, 64]} css={deckCounterStyle} />;
};

export default DeckCounter;
