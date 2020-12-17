import { useRecoilValue } from "recoil";
import { socketState } from "../state";

const useSocketId = (): string => {
  return useRecoilValue(socketState).id;
};

export default useSocketId;
