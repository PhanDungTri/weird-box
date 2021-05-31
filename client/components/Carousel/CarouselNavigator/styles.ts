import styled from "@emotion/styled";
import { COLOR } from "../../../constants";
import Grid from "../../Grid";
import { CarouselContentProps } from "../types";

export const StyledCaurouselNavigator = styled(Grid)<Pick<CarouselContentProps, "items">>`
  position: absolute;
  width: 100%;
  bottom: 8px;
  grid-template-columns: repeat(${({ items }) => items}, auto);
  justify-content: center;
`;

export const CarouselNode = styled.div<{ active?: boolean }>`
  width: 1rem;
  height: 1rem;
  background-color: ${COLOR.Normal};
  filter: opacity(${({ active = false }) => (active ? 100 : 50)}%);
`;
