import { useDispatch } from "react-redux";
import Button from "../../components/Button";
import { requestNotifyAction } from "../../store/actions";
import { pageStyle } from "../../styles";

const Test = (): JSX.Element => {
  const dispatch = useDispatch();

  return (
    <div css={pageStyle}>
      <Button onClick={() => dispatch(requestNotifyAction({ message: "Test", variant: "Info" }))}>Notify!</Button>
    </div>
  );
};

export default Test;
