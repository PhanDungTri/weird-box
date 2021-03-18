import ROUTE from "../constants/ROUTE";
import { useAppState } from "../hooks/useStore";
import Game from "./Game";
import Hub from "./Hub";
import Test from "./Test";

const pages = {
  [ROUTE.InGame]: <Game />,
  [ROUTE.Hub]: <Hub />,
  [ROUTE.Test]: <Test />,
};

const App = (): JSX.Element => {
  const route = useAppState((state) => state.route);
  return pages[route];
};

export default App;
