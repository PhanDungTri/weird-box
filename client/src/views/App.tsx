import ROUTE from "../constants/ROUTE";
import { useAppState } from "../hooks/useStore";
import { AppState } from "../store";
import Game from "./Game";
import Hub from "./Hub";
import Test from "./Test";

const pages = {
  [ROUTE.InGame]: <Game />,
  [ROUTE.Hub]: <Hub />,
  [ROUTE.Test]: <Test />,
};

const selectRoute = (state: AppState) => state.route;

const App = (): JSX.Element => {
  const route = useAppState(selectRoute);
  return pages[route];
};

export default App;
