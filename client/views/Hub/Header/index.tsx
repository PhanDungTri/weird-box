import Settings from "../../../components/Settings";
import { StyledHeader } from "./styles";

const Header = (): JSX.Element => {
  return (
    <StyledHeader>
      <div>v0.0.1</div>
      <div>
        <Settings />
      </div>
    </StyledHeader>
  );
};

export default Header;
