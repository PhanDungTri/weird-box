import { useAtom } from "jotai";
import { useCallback } from "react";
import Input from "../../components/Input";
import { playerNameAtom } from "./atom";

const PlayerNameInput = (): JSX.Element => {
  const [name, setName] = useAtom(playerNameAtom);

  const onChange = useCallback(
    (() => {
      let timeout: number;
      return (name: string) => {
        clearTimeout(timeout);
        timeout = window.setTimeout(() => setName(name), 200);
      };
    })(),
    []
  );

  return <Input defaultValue={name} onChange={(e) => onChange(e.target.value)} />;
};

export default PlayerNameInput;
