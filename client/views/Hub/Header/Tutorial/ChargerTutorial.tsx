import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { languageAtom } from "../../../../atoms";
import Charger from "../../../../components/Charger";
import H1 from "../../../../components/H1";

const ChargerTutorial = (): JSX.Element => {
  const [point, setPoint] = useState(0);
  const [language] = useAtom(languageAtom);

  useEffect(() => {
    const timeout = window.setTimeout(() => setPoint((point + 1) % 11), 1200);
    return () => clearTimeout(timeout);
  }, [point]);

  return (
    <div>
      <H1 css={{ textAlign: "center" }}>{language.chargerTutorialHeader}</H1>
      <Charger
        point={point}
        max={10}
        css={{ position: "relative", left: "50%", transform: "translateX(calc(-50% - 4px))" }}
      />
      <ReactMarkdown css={{ padding: "8px" }}>{language.chargerTutorial}</ReactMarkdown>
    </div>
  );
};

export default ChargerTutorial;
