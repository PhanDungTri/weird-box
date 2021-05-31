import { css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled";
import { COLOR } from "../../constants";
import { pixelBorderStyle } from "../../styles";
import { shadeColor, tintColor } from "../../utils";

export const StyledProgressBar = styled.div`
  position: relative;
  ${pixelBorderStyle(4, [COLOR.Normal])};
  margin: 8px;
  height: 16px;
`;

export const ProgressBarCurrentValue = styled.div`
  background-color: ${shadeColor(COLOR.Safe, 20)};
  box-shadow: inset 0px 8px 0px 0px ${tintColor(COLOR.Safe, 20)};
  transition: width 300ms;
  height: 100%;
`;

export const ProgressBarUnderlayValue = styled.div`
  transition-delay: 600ms;
  position: absolute;
  top: 0;
  background-color: ${COLOR.Danger};
  box-shadow: none;
  z-index: -1;
`;

export const currentValueStyle = (value: number): SerializedStyles => css`
  background-color: ${shadeColor(COLOR.Safe, 20)};
  box-shadow: inset 0px 8px 0px 0px ${tintColor(COLOR.Safe, 20)};
  transition: width 300ms;
  width: ${value}%;
  height: 100%;
`;

export const currentValueUnderlayStyle = css`
  transition-delay: 600ms;
  position: absolute;
  top: 0;
  background-color: ${COLOR.Danger};
  box-shadow: none;
  z-index: -1;
`;
