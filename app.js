import { csvParse, select } from "d3";
import { feature, transform } from "topojson-client";
import { choroplethMap } from "./src/choroplethMap";
import "./src/style.css";

const worldAtlasURL =
  "https://unpkg.com/visionscarto-world-atlas@0.1.0/world/110m.json";

const dataURL =
  "https://gist.githubusercontent.com/curran/4914da157af89894e4190b21452a54d3/raw/a10ed7ebaf4689fe8be20f47dfc9ffc13bfdda8b/API_NY.GDP.PCAP.PP.CD_DS2_en_csv_v2_4901661.csv";

export const mainContainer = (container, { state, setState }) => {
  const width = state.width;
  const height = state.height;

  const svg = select(container)
    .selectAll("svg")
    .data([null])
    .join("svg")
    .attr("width", width)
    .attr("height", height);

  // state.data could be:
  // * undefined
  // * 'LOADING'
  // * An object containing `countries` and `data`
  const { allData } = state;

  if (allData !== "LOADING" && allData !== undefined) {
    svg.call(choroplethMap, {
      allData,
      state,
      setState,
      colorValue: (d) => d.gdp,
    });
  }

  if (allData === undefined) {
    setState((state) => ({
      ...state,
      allData: "LOADING",
    }));

    Promise.all([
      fetch(worldAtlasURL)
        .then((response) => response.json())
        .then((worldAtlasData) => feature(worldAtlasData, "countries")),

      fetch(dataURL)
        .then((response) => response.text())
        .then((csvString) => {
          const modifiedCsvString = csvString.substring(86);
          const data = csvParse(modifiedCsvString);
          return data.map((d) => ({
            gdp: d["2021"] === "" ? null : +d["2021"],
            country: d["Country Code"],
            countryName: d["Country Name"],
          }));
        }),
    ]).then(([countries, data]) => {
      setState((state) => ({
        ...state,
        allData: { countries, data },
      }));
    });
  }
};
