import { CLIENT_EVENT_NAME } from "../../../shared/constants";
import Button from "../../components/Button";
import Loading from "../../components/Loading";
import socket from "../../services/socket";
import { centerizeContainerStyle, gridStyle } from "../../styles";

const FindingGame = (): JSX.Element => {
  const cancel = () => socket.emit(CLIENT_EVENT_NAME.CancelFindGame);

  return (
    <div css={[gridStyle, centerizeContainerStyle]}>
      <Loading text="Finding opponents..." />
      <Button variation="Danger" onClick={cancel}>
        Cancel
      </Button>
    </div>
  );
};

export default FindingGame;
