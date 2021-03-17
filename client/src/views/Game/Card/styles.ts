import { css } from "@emotion/react";
import styled from "@emotion/styled";
import ContentFrameSprite from "../../../assets/sprites/card_content_frame.png";
import COLOR from "../../../constants/COLOR";
import { BorderColors, centerizeStyle, pixelBorderStyle } from "../../../styles";
import { shadeColor, tintColor } from "../../../utils/color";

const contentBorderWidth = 12;

export const cardChosenStyle = css`
  transform: translateY(-30px);
`;

export const cardStyle = css`
  ${pixelBorderStyle(2, [COLOR.Coal], [
    COLOR.White,
    ...new Array<string>(3).fill(shadeColor(COLOR.Primary, 20)),
  ] as BorderColors)};
  position: relative;
  box-sizing: border-box;
  background-color: ${COLOR.Primary};
  width: 4rem;
  height: 6rem;
  user-select: none;
  transition: transform 0.3s;
`;

export const CardContent = styled.div`
  ${centerizeStyle};
  border: ${contentBorderWidth}px solid transparent;
  border-image: url(${ContentFrameSprite}) ${contentBorderWidth} round;
  width: 1rem;
  height: 3rem;
`;

const cardInfoStyle = css`
  position: absolute;
  display: inline-block;
  background-color: ${COLOR.Primary};
  color: ${tintColor(COLOR.Coal, 20)};
  font-family: "Dogica Pixel";
  font-size: 10px;
  font-weight: bold;
  left: 50%;
`;

export const CardPower = styled.div`
  ${cardInfoStyle};
  top: ${-contentBorderWidth}px;
  transform: translate(-50%, -25%);
`;

export const CardAction = styled.div`
  ${cardInfoStyle};
  bottom: ${-contentBorderWidth}px;
  transform: translate(-50%, 25%);
`;
