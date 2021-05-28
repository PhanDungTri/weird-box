import { useAtom } from "jotai";
import { JSXElementConstructor, useEffect, useRef, useState } from "react";
import { notificationsAtom, routeAtom } from "../atoms";
import Loading from "../components/Loading";
import { ROUTE } from "../constants";
import { centerizeStyle, pageStyle } from "../styles";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function withSpriteLoading<P, C>(WrappedComponent: JSXElementConstructor<P> & C, paths: string[]) {
  type Props = JSX.LibraryManagedAttributes<C, P>;

  const WithSpriteLoading = (props: Props) => {
    const [, changeRoute] = useAtom(routeAtom);
    const [, notify] = useAtom(notificationsAtom);
    const [status, setStatus] = useState<"Loading" | "Loaded" | "Failed">("Loading");
    const [loaded, setLoaded] = useState(0);
    const total = useRef(paths.length);

    useEffect(() => {
      if (loaded === total.current) setStatus("Loaded");
      else {
        const img = new Image();
        img.src = paths[loaded];
        img.onload = () => setLoaded(loaded + 1);
        img.onerror = () => {
          notify({
            message: "Failed to load resources!",
            variant: "Danger",
          });

          changeRoute(ROUTE.Hub);
        };
      }
    }, [loaded]);

    return status === "Loaded" ? (
      <WrappedComponent {...(props as any)} />
    ) : (
      <div css={pageStyle}>
        <Loading css={centerizeStyle} scale={4} />{" "}
      </div>
    );
  };

  return WithSpriteLoading;
}

export default withSpriteLoading;
