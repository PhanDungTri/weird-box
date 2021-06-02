import { useAtom } from "jotai";
import { CLIENT_EVENT_NAME } from "../../../shared/constants";
import { languageAtom } from "../../atoms";
import Button from "../../components/Button";
import CenterizedGrid from "../../components/CenterizedGrid";
import Loading from "../../components/Loading";
import socket from "../../services/socket";

const FindingGame = (): JSX.Element => {
  const [language] = useAtom(languageAtom);

  const cancel = () => socket.emit(CLIENT_EVENT_NAME.CancelFindGame);

  return (
    <CenterizedGrid>
      <Loading text={`${language.findingOpponents}...`} />
      <Button variation="Danger" onClick={cancel}>
        {language.cancel}
      </Button>
    </CenterizedGrid>
  );
};

export default FindingGame;
