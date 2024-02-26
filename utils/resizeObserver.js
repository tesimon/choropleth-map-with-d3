export const resizeObserver = ({ state, setState }) => {
  if (state.width === undefined) {
    setState((state) => ({
      ...state,
      width: innerWidth,
      height: innerHeight,
    }));
  }

  addEventListener("resize", (e) => {
    let width = e.target.innerWidth;
    let height = e.target.innerHeight;

    setState((state) => ({
      ...state,
      width,
      height,
    }));
  });
};
