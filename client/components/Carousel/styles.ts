import { css, SerializedStyles } from "@emotion/react";
import styled from "@emotion/styled/";
import Grid from "../Grid";
import { CarouselContentProps } from "./types";

export const StyledCarousel = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  overflow: hidden;
  min-height: 24px;
`;

export const CarouselContent = styled(Grid)<CarouselContentProps>`
  gap: 0px;
  width: ${({ items }) => items * 100}%;
  height: 100%;
  grid-template-columns: repeat(${({ items }) => items}, 1fr);
  transform: translateX(calc(-${({ items, current }) => (current * 100) / items}%));
  transition: transform 0.5s;
`;

export const navigateButtonStyle = (left = true): SerializedStyles => css`
  ${left
    ? css`
        left: 0;
      `
    : css`
        right: 0;
      `}
  transform: translateY(-50%) rotate(${left ? 90 : -90}deg);
  top: 50%;
  z-index: 1;
`;
