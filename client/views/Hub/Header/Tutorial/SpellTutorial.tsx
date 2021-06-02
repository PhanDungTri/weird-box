import { useAtom } from "jotai";
import ReactMarkdown from "react-markdown";
import { languageAtom } from "../../../../atoms";
import H1 from "../../../../components/H1";

const SpellTutorial = (): JSX.Element => {
  const [language] = useAtom(languageAtom);

  return (
    <div>
      <H1 css={{ textAlign: "center" }}>{language.spellTutorialHeader}</H1>
      <ReactMarkdown>{language.spellTutorial}</ReactMarkdown>
    </div>
  );
};

export default SpellTutorial;
