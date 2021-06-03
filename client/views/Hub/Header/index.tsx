import About from "./About";
import Settings from "./Settings";
import { StyledHeader } from "./styles";
import Tutorial from "./Tutorial";

const Header = (): JSX.Element => {
  return (
    <StyledHeader>
      <div>v0.1.0</div>
      <div>
        <About />
        <Tutorial />
        <Settings />
      </div>
    </StyledHeader>
  );
};

export default Header;
