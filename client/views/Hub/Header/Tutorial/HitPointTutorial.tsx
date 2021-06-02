import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { languageAtom } from "../../../../atoms";
import H1 from "../../../../components/H1";
import ProgressBar from "../../../../components/ProgressBar";

const HitPointTutorial = (): JSX.Element => {
  const [hp, setHP] = useState(100);
  const [language] = useAtom(languageAtom);

  useEffect(() => {
    const timeout = setTimeout(() => setHP((hp + 100) % 110), 950);
    return () => clearTimeout(timeout);
  }, [hp]);

  return (
    <div>
      <H1 css={{ textAlign: "center" }}>{language.hpTutorialHeader}</H1>
      <ProgressBar
        current={hp}
        css={{ position: "relative", left: "50%", transform: "translateX(calc(-50% - 4px))", width: "60%" }}
      />
      <ReactMarkdown css={{ padding: "8px" }}>{language.hpTutorial}</ReactMarkdown>
    </div>
  );
};

export default HitPointTutorial;
