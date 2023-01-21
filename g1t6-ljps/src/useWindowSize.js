import React from "react";

export default function useWindowSize() {
  const isSSR = typeof window !== "undefined";
  const [windowSize, setWindowSize] = React.useState({
    screenWidth: isSSR ? 1200 : window.innerWidth,
    screenHeight: isSSR ? 800 : window.innerHeight,
  });

  function changeWindowSize() {
    setWindowSize({ screenWidth: window.innerWidth, screenHeight: window.innerHeight });
  }

  React.useEffect(() => {
    window.addEventListener("resize", changeWindowSize);

    return () => {
      window.removeEventListener("resize", changeWindowSize);
    };
  }, []);

  return windowSize;
}