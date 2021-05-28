import { css } from "@emotion/react";
import styled from "@emotion/styled";
import ContentFrameSprite from "../../../assets/sprites/card_content_frame.png";
import { COLOR } from "../../../constants";
import { BorderColors, centerizeContainerStyle, centerizeStyle, gridStyle, pixelBorderStyle } from "../../../styles";
import { shadeColor, tintColor } from "../../../utils";

const CONTENT_BORDER_WIDTH = 12;

const commonStyle = css`
  ${pixelBorderStyle(2, [COLOR.Coal], [
    COLOR.White,
    ...new Array<string>(3).fill(shadeColor(COLOR.Primary, 20)),
  ] as BorderColors)};
  position: relative;
  box-sizing: border-box;
  background-color: ${COLOR.Primary};
  user-select: none;
  color: ${tintColor(COLOR.Coal, 20)};
  font-family: "Dogica Pixel";
  font-size: 10px;
  font-weight: bold;
`;

export const cardChosenStyle = css`
  transform: translateY(-30px);
`;

export const SmallCard = styled.div`
  ${commonStyle};
  ${gridStyle};
  ${centerizeContainerStyle};
  width: ${8 / 3}rem;
  height: 4rem;
  padding: 2px;
`;

export const NormalCard = styled.div`
  ${commonStyle};
  width: 4rem;
  height: 6rem;
  transition: transform 0.3s;
`;

export const CardContent = styled.div`
  ${centerizeStyle};
  border: ${CONTENT_BORDER_WIDTH}px solid transparent;
  border-image: url(${ContentFrameSprite}) ${CONTENT_BORDER_WIDTH} round;
  width: 1rem;
  height: 3rem;
`;

const cardInfoStyle = css`
  position: absolute;
  display: inline-block;
  background-color: ${COLOR.Primary};
  left: 50%;
`;

export const CardPower = styled.div`
  ${cardInfoStyle};
  top: ${-CONTENT_BORDER_WIDTH}px;
  transform: translate(-50%, -25%);
`;

export const CardAction = styled.div`
  ${cardInfoStyle};
  bottom: ${-CONTENT_BORDER_WIDTH}px;
  transform: translate(-50%, 25%);
`;
