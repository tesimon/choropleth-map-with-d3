import {
  geoOrthographic,
  geoPath,
  scaleQuantile,
  schemeYlGnBu,
  easeCubicOut,
} from "d3";
import * as d3 from "d3";
import { zoomMapFunc } from "./components/zoomMap.js";
import { updateResizeWindow } from "./components/updateResizeWindow.js";
import { rotationFunction } from "./components/rotationFunction.js";
import { colorLegend } from "./components/colorLegend.js";
import { tooltipFunction } from "./components/tooltipFunction.js";

export const choroplethMap = (selc, { allData, colorValue, state }) => {
  const { countries, data } = allData;
  const { width, height } = state;
  const dataMerge = new Map();

  for (const d of data) {
    dataMerge.set(d.country, d);
    dataMerge.set(d.countryName, d);
  }

  const getCountryDataObject = (feature) => {
    return dataMerge.get(feature.properties.a3) || null;
  };

  const featurecolorValue = (feature) => {
    return dataMerge.get(feature.properties.a3);
  };

  const transition = d3.transition().duration(300).ease(easeCubicOut);

  const colorScale = scaleQuantile()
    .domain(data.map(colorValue))
    .range(schemeYlGnBu[9].reverse());

  const projection = geoOrthographic();
  const path = geoPath(projection);

  const getCountryNameByGdp = (feature) => {
    const featureObj = getCountryDataObject(feature);
    const name = featureObj?.countryName;
    const gdp = featureObj?.gdp;
    return name ? { name, gdp } : ` not found any data  ~ `;
  };

  //dom oparetions
  selc
    .selectAll("path.outline")
    .data([{ type: "Sphere" }])
    .join("path")
    .attr("class", "outline")
    .attr("d", path)
    .attr("fill", "none")
    .attr("stroke", "cyan")
    .attr("stroke-width", 0.8);

  selc
    .selectAll("path.country")
    .data(countries.features)
    .join("path")
    .attr("d", path)
    .attr("class", "country")
    .attr("stroke", "#AAA")
    .attr("fill", (feature) => {
      const d = featurecolorValue(feature);
      return d && colorValue(d) ? colorScale(colorValue(d)) : "rgba(0,0,0,0.5)";
    });

  //color-legend function
  colorLegend(colorScale);

  // Select the path elements
  const paths = selc.selectAll("path.country");

  //selected tooltip div
  const tooltip = d3.select("#tooltip");

  //tooltip function
  tooltipFunction({ paths, getCountryNameByGdp, tooltip });

  //custom rotation function
  rotationFunction({ path, projection, selc, paths });

  //zoom function

  zoomMapFunc({ selc, path, paths, projection, transition });

  // window resize function
  updateResizeWindow({
    selc,
    width,
    height,
    projection,
    paths,
    path,
    transition,
  });
};
