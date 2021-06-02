import styled from "@emotion/styled";
import { COLOR } from "../../../constants";
import { xCenterStyle } from "../../../styles";
import Grid from "../../Grid";
import { CarouselContentProps } from "../types";

export const StyledCaurouselNavigator = styled(Grid)<Pick<CarouselContentProps, "items">>`
  ${xCenterStyle};
  position: absolute;
  bottom: 8px;
  grid-template-columns: repeat(${({ items }) => items}, auto);
`;

export const CarouselNode = styled.div<{ active?: boolean }>`
  width: 0.5rem;
  height: 0.5rem;
  background-color: ${COLOR.Normal};
  filter: opacity(${({ active = false }) => (active ? 100 : 50)}%);
`;
