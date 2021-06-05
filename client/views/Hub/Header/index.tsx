import { useAtom } from "jotai";
import { versionAtom } from "../../../atoms";
import About from "./About";
import Settings from "./Settings";
import { StyledHeader } from "./styles";
import Tutorial from "./Tutorial";

const Header = (): JSX.Element => {
  const [version] = useAtom(versionAtom);

  return (
    <StyledHeader>
      <div>{version}</div>
      <div>
        <About />
        <Tutorial />
        <Settings />
      </div>
    </StyledHeader>
  );
};

export default Header;
