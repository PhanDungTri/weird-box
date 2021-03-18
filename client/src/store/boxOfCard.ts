import create from "zustand/vanilla";
import { SOCKET_EVENT } from "../../../shared/src/@enums";
import socket from "../services/socket";

type BoxOfCardState = {
  status: "deal" | "idle";
  idle: () => void;
  deal: () => void;
  chargePoint: number;
  overcharged: boolean;
  stabilize: () => void;
};

const boxOfCardState = create<BoxOfCardState>((set) => ({
  status: "idle",
  idle: () => set({ status: "idle" }),
  deal: () => set({ status: "deal" }),
  chargePoint: 0,
  overcharged: false,
  stabilize: () => set({ overcharged: false }),
}));

const { setState } = boxOfCardState;

socket.on(SOCKET_EVENT.Overcharged, () => setState({ overcharged: true }));
socket.on(SOCKET_EVENT.ChargePointChanged, (chargePoint: number) => setState({ chargePoint }));

export default boxOfCardState;
