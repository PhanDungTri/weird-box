import { useAtom } from "jotai";
import { routeAtom } from "../atoms";
import ROUTE from "../constants/ROUTE";
import Game from "./Game";
import Hub from "./Hub";
import Test from "./Test";

const pages = {
  [ROUTE.InGame]: <Game />,
  [ROUTE.Hub]: <Hub />,
  [ROUTE.Test]: <Test />,
};

const App = (): JSX.Element => {
  const [route] = useAtom(routeAtom);
  return pages[route];
};

export default App;
