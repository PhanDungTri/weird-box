import { useAtom } from "jotai";
import ReactMarkdown from "react-markdown";
import { chosenLanguageAtom, routeAtom, versionAtom } from "../../atoms";
import Dialog from "../../components/Dialog";
import { ROUTE } from "../../constants";
import { useLocalStorage } from "../../hooks";
import useShowDialog from "../../hooks/useShowDialog";

const content = {
  en: {
    in: "in",
    title: "What's new",
    text: `### Change:\n- Tutorial now will show up on the first time visit.\n- Re-write tutorial.`,
  },
  vi: {
    in: "trong",
    title: "Có gì mới",
    text: `### Thay đổi:\n- Hướng dẫn cách chơi sẽ tự động mở cho lần đầu ghé thăm trò chơi.\n- Viết lại hướng dẫn.`,
  },
};

const WhatsNew = (): JSX.Element => {
  const [, setRoute] = useAtom(routeAtom);
  const [, setClientVersion] = useLocalStorage("version", "");
  const [chosenLanguage] = useAtom(chosenLanguageAtom);
  const [version] = useAtom(versionAtom);
  const [shouldShow, action] = useShowDialog(true);

  const close = () => {
    action.hide();
    setClientVersion(version);
    setRoute(ROUTE.Hub);
  };

  return (
    <Dialog
      show={shouldShow}
      title={`${content[chosenLanguage].title} ${content[chosenLanguage].in} ${version}?`}
      onYes={close}
    >
      <div>
        <ReactMarkdown>{content[chosenLanguage].text}</ReactMarkdown>
      </div>
    </Dialog>
  );
};

export default WhatsNew;
