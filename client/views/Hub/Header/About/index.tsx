import { useAtom } from "jotai";
import ReactMarkdown from "react-markdown";
import { languageAtom } from "../../../../atoms";
import Dialog from "../../../../components/Dialog";
import Icon from "../../../../components/Icon";
import useShowDialog from "../../../../hooks/useShowDialog";
import { clickableIconStyle } from "../../../../styles";

const About = (): JSX.Element => {
  const [shouldDialogShow, dialogAction] = useShowDialog();
  const [language] = useAtom(languageAtom);

  return (
    <>
      <Icon name="info" onClick={dialogAction.reveal} css={clickableIconStyle} />
      <Dialog show={shouldDialogShow} title={language.about} onYes={dialogAction.hide}>
        <div>
          <ReactMarkdown>{language.aboutDescription}</ReactMarkdown>
        </div>
      </Dialog>
    </>
  );
};

export default About;
