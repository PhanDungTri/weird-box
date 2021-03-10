import Button from "../../components/Button";
import useNotificationState from "../../state/notificationState";
import { pageStyle } from "../../styles";

const Test = (): JSX.Element => {
  const { notify } = useNotificationState();

  return (
    <div css={pageStyle}>
      <Button onClick={() => notify("Info", 3000)("Test")}>Notify!</Button>
    </div>
  );
};

export default Test;
