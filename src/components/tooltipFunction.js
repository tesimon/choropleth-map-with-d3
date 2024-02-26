import * as d3 from "d3";

export const tooltipFunction = ({
  paths,
  getCountryNameByGdp,
  gdp,
  tooltip,
}) => {
  paths.each(function (countryDataObj) {
    d3.select(this)
      .on("mouseover", function (d) {
        const { name, gdp } = getCountryNameByGdp(countryDataObj);
        if (name) {
          tooltip
            .text(`${name}  (${gdp ? gdp : "not included"})`)
            .style("left", d.pageX + 10 + "px")
            .style("font-weight", "bold")
            .style("top", d.pageY + 10 + "px")
            .classed("hidden", false);

          d3.select(this).style("opacity", 0.7);
        }
      })
      .on("mouseout", function (d) {
        // Hide tooltip
        tooltip.classed("hidden", true);

        // Restore original opacity
        d3.select(this).style("opacity", 1);
      });
  });
};
