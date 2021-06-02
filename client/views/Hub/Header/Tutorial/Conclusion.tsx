import { useAtom } from "jotai";
import ReactMarkdown from "react-markdown";
import { languageAtom } from "../../../../atoms";
import H1 from "../../../../components/H1";

const Conclusion = (): JSX.Element => {
  const [language] = useAtom(languageAtom);

  return (
    <div>
      <H1 css={{ textAlign: "center" }}>{language.conclusionTutorialHeader}</H1>
      <ReactMarkdown>{language.conclusionTutorial}</ReactMarkdown>
    </div>
  );
};

export default Conclusion;
