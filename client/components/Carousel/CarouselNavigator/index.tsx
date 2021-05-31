import { CarouselContentProps } from "../types";
import { StyledCaurouselNavigator, CarouselNode } from "./styles";

type CarouselNavigatorProps = CarouselContentProps & {
  onClick: (index: number) => void;
};

const CarouselNavigator = ({ items, current, onClick }: CarouselNavigatorProps): JSX.Element => {
  const drawNode = () => {
    const arr: JSX.Element[] = [];
    for (let i = 0; i < items; i++)
      arr.push(<CarouselNode key={i} active={i === current} onClick={() => onClick(i)} />);
    return arr;
  };

  return <StyledCaurouselNavigator items={items}>{drawNode()}</StyledCaurouselNavigator>;
};

export default CarouselNavigator;
