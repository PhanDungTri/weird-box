import Button from "../../components/Button";
import useNotification from "../../hooks/useNotification";
import { pageStyle } from "../../styles";

const Test = (): JSX.Element => {
  const { notify } = useNotification();

  return (
    <div css={pageStyle}>
      <Button onClick={() => notify("Info", 30000)("Test")}>Notify!</Button>
    </div>
  );
};

export default Test;
