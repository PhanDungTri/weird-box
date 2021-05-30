import Settings from "../../../components/Settings";
import { headerStyle } from "./styles";

const Header = (): JSX.Element => {
  return (
    <div css={headerStyle}>
      <div>v0.0.1</div>
      <div>
        <Settings />
      </div>
    </div>
  );
};

export default Header;
