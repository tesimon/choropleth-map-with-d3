import { select } from "d3";
import { mainContainer } from "./app";
import { resizeObserver } from "./utils/resizeObserver";

const container = select("#app").node();

export let state = {};

const render = () => {
  mainContainer(container, {
    state,
    setState,
  });
};

export const setState = (next) => {
  state = next(state);
  render();
};

resizeObserver({ state, setState });
render();
