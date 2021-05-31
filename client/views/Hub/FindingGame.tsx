import { CLIENT_EVENT_NAME } from "../../../shared/constants";
import Button from "../../components/Button";
import CenterizedGrid from "../../components/CenterizedGrid";
import Loading from "../../components/Loading";
import socket from "../../services/socket";

const FindingGame = (): JSX.Element => {
  const cancel = () => socket.emit(CLIENT_EVENT_NAME.CancelFindGame);

  return (
    <CenterizedGrid>
      <Loading text="Finding opponents..." />
      <Button variation="Danger" onClick={cancel}>
        Cancel
      </Button>
    </CenterizedGrid>
  );
};

export default FindingGame;
