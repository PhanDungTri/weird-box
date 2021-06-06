import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { SPELL_NAME } from "../../../../../shared/constants";
import { languageAtom } from "../../../../atoms";
import Card from "../../../../components/Card";
import Charger from "../../../../components/Charger";
import H1 from "../../../../components/H1";
import Sprite from "../../../../components/Sprite";
import { xCenterStyle } from "../../../../styles";
import BoxOfCardsSprite from "url:../../../../assets/sprites/box_of_cards.png";

const GameplayTutorial = (): JSX.Element => {
  const [point, setPoint] = useState(0);
  const [language] = useAtom(languageAtom);

  useEffect(() => {
    const timeout = window.setTimeout(() => setPoint((point + 1) % 11), 1200);
    return () => clearTimeout(timeout);
  }, [point]);

  return (
    <div>
      <H1 css={{ textAlign: "center" }}>Gameplay</H1>
      <ReactMarkdown>{language.gameplayStarting}</ReactMarkdown>
      <Card
        card={{ id: "0", power: 3, spell: SPELL_NAME.Poison }}
        css={{ left: "50%", transform: "translateX(calc(-50% - 2px))" }}
      />
      <ReactMarkdown>{language.gameplayCard}</ReactMarkdown>
      <Charger
        point={point}
        max={10}
        css={{ position: "relative", left: "50%", transform: "translateX(calc(-50% - 4px))" }}
      />
      <ReactMarkdown>{language.gameplayBox}</ReactMarkdown>
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
        <Sprite src={BoxOfCardsSprite} row={1} size={[59, 59]} steps={11} loop={-1} />
      </div>
      <ReactMarkdown>{language.gameplaySpell}</ReactMarkdown>
    </div>
  );
};

export default GameplayTutorial;
