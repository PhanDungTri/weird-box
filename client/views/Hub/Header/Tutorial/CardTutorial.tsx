import { useAtom } from "jotai";
import ReactMarkdown from "react-markdown";
import { SPELL_NAME } from "../../../../../shared/constants";
import { languageAtom } from "../../../../atoms";
import Card from "../../../../components/Card";
import H1 from "../../../../components/H1";

const CardTutorial = (): JSX.Element => {
  const [language] = useAtom(languageAtom);
  return (
    <div>
      <H1 css={{ textAlign: "center" }}>{language.cardTutorialHeader}</H1>
      <Card
        card={{ id: "0", power: 7, spell: SPELL_NAME.Poison }}
        css={{ left: "50%", transform: "translateX(calc(-50% - 2px))" }}
      />
      <ReactMarkdown css={{ padding: "8px" }}>{language.cardTutorial}</ReactMarkdown>
    </div>
  );
};

export default CardTutorial;
