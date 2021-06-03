import { css } from "@emotion/react";
import styled from "@emotion/styled";
import ContentFrameSprite from "url:../../assets/sprites/card_content_frame.png";
import { COLOR } from "../../constants";
import { BorderColors, centerizeStyle, pixelBorderStyle } from "../../styles";
import { shadeColor, tintColor } from "../../utils";
import CenterizedGrid from "../CenterizedGrid";

const CONTENT_BORDER_WIDTH = 12;

const commonStyle = css`
  ${pixelBorderStyle(2, [COLOR.Normal], [
    COLOR.White,
    ...new Array<string>(3).fill(shadeColor(COLOR.Primary, 20)),
  ] as BorderColors)};
  position: relative;
  box-sizing: border-box;
  background-color: ${COLOR.Primary};
  user-select: none;
  color: ${tintColor(COLOR.Normal, 20)};
  font-family: "Dogica Pixel";
  font-weight: bold;
  transition: transform 0.3s;
`;

export const cardChosenStyle = css`
  transform: translateY(-30px);
`;

export const SmallCard = styled(CenterizedGrid)`
  ${commonStyle};
  font-size: 10px;
  width: 32px;
  height: 48px;
  padding: 2px;
`;

export const NormalCard = styled.div`
  ${commonStyle};
  width: 48px;
  height: 72px;
`;

export const CardContent = styled.div`
  ${centerizeStyle};
  border: ${CONTENT_BORDER_WIDTH}px solid transparent;
  border-image: url(${ContentFrameSprite}) ${CONTENT_BORDER_WIDTH} round;
  width: 12px;
  height: 36px;
`;

const cardInfoStyle = css`
  position: absolute;
  display: inline-block;
  background-color: ${COLOR.Primary};
  left: 50%;
`;

export const CardPower = styled.div`
  ${cardInfoStyle};
  font-size: 10px;
  top: ${-CONTENT_BORDER_WIDTH}px;
  transform: translate(-50%, -25%);
`;

export const CardAction = styled.div`
  ${cardInfoStyle};
  font-size: 12px;
  font-weight: bold;
  bottom: ${-CONTENT_BORDER_WIDTH - 1}px;
  transform: translate(-50%, 25%);
`;
