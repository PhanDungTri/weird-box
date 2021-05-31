import { useAtom } from "jotai";
import { JSXElementConstructor, useEffect, useRef, useState } from "react";
import { routeAtom } from "../atoms";
import Loading from "../components/Loading";
import Page from "../components/Page";
import { ROUTE } from "../constants";
import { useNotify } from "../hooks/useNotify";
import { centerizeStyle } from "../styles";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function withSpriteLoading<P, C>(WrappedComponent: JSXElementConstructor<P> & C, paths: string[]) {
  type Props = JSX.LibraryManagedAttributes<C, P>;

  const WithSpriteLoading = (props: Props) => {
    const [, changeRoute] = useAtom(routeAtom);
    const [status, setStatus] = useState<"Loading" | "Loaded" | "Failed">("Loading");
    const [loaded, setLoaded] = useState(0);
    const total = useRef(paths.length);
    const notify = useNotify();

    useEffect(() => {
      if (loaded === total.current) setStatus("Loaded");
      else {
        const img = new Image();
        img.src = paths[loaded];
        img.onload = () => setLoaded(loaded + 1);
        img.onerror = () => {
          notify("Failed to load resources!", "Danger");
          changeRoute(ROUTE.Hub);
        };
      }
    }, [loaded]);

    return status === "Loaded" ? (
      <WrappedComponent {...(props as any)} />
    ) : (
      <Page>
        <Loading css={centerizeStyle} scale={4} />{" "}
      </Page>
    );
  };

  return WithSpriteLoading;
}

export default withSpriteLoading;
