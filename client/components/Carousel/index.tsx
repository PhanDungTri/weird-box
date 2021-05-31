import { Children, ReactNode, useState } from "react";
import Icon from "../Icon";
import CarouselNavigator from "./CarouselNavigator";
import { CarouselContent, StyledCarousel, navigateButtonStyle } from "./styles";

type CarouselProps = {
  className?: string;
  children: ReactNode;
};

const Carousel = ({ children, className }: CarouselProps): JSX.Element => {
  const [numOfChildren] = useState(Children.count(children));
  const [current, setCurrent] = useState(0);

  const onNext = () => setCurrent((current + 1) % numOfChildren);
  const onPrev = () => setCurrent((current + numOfChildren - 1) % numOfChildren);

  return (
    <StyledCarousel className={className}>
      <Icon name="triangle" css={navigateButtonStyle(true)} onClick={onPrev} />
      <Icon name="triangle" css={navigateButtonStyle(false)} onClick={onNext} />
      <CarouselContent items={numOfChildren} current={current}>
        {children}
      </CarouselContent>
      <CarouselNavigator items={numOfChildren} onClick={setCurrent} current={current} />
    </StyledCarousel>
  );
};

export default Carousel;
export * from "./CarouselItem";
