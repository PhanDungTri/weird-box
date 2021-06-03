import { useAtom } from "jotai";
import ReactMarkdown from "react-markdown";
import BoxOfCardsSprite from "url:../../../../assets/sprites/box_of_cards.png";
import { languageAtom } from "../../../../atoms";
import H1 from "../../../../components/H1";
import Sprite from "../../../../components/Sprite";
import { xCenterStyle } from "../../../../styles";

const OverchargedTutorial = (): JSX.Element => {
  const [language] = useAtom(languageAtom);

  return (
    <div>
      <H1 css={{ textAlign: "center" }}>{language.overchargedTutorialHeader}</H1>
      <div
        css={[
          {
            position: "relative",
            width: "59px",
            height: "59px",
          },
          xCenterStyle,
        ]}
      >
        <Sprite src={BoxOfCardsSprite} row={0} size={[59, 59]} steps={1} />
        <Sprite src={BoxOfCardsSprite} row={1} size={[59, 59]} steps={11} loop />
      </div>
      <ReactMarkdown css={{ padding: "8px" }}>{language.overchargedTutorial}</ReactMarkdown>
    </div>
  );
};

export default OverchargedTutorial;
