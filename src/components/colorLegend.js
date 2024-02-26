import * as d3 from "d3";

export const colorLegend = (colorScale) => {
  d3.select(".legend")
    .style("width", "fit-content")
    .selectAll("div")
    .data(colorScale.range())
    .join("div")
    .style("background-color", (d) => d)
    .style(
      "color",
      (d, i) =>
        (i === 0 && "crimson") ||
        (i === colorScale.range().length - 1 ? "black" : d)
    )
    .style("text-align", "center")
    .text(
      (d, i) =>
        (i === 0 && " low") || (i === colorScale.range().length - 1 && "high")
    )
    .style("width", 80 + "px")
    .style("height", 20)
    .style("font-weight", "bold");
};
