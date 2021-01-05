import { useRecoilValue } from "recoil";
import socketState from "../state/socketState";

const useSocketId = (): string => {
  return useRecoilValue(socketState).id;
};

export default useSocketId;
