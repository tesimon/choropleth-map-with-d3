export const zoomMapFunc = ({ selc, path, paths, projection, transition }) => {
  selc.on("wheel", (e) => {
    const deltaY = e.deltaY;
    const newScale = calculateNewScale(deltaY);
    updateZoomLevel(newScale);
    paths.attr("d", path).attr("transition", transition);
    selc.selectAll("path.outline").attr("d", path);
  });

  function updateZoomLevel(newScale) {
    projection.scale(newScale);
  }

  //calculate new SCale Function

  function calculateNewScale(deltaY) {
    const factor = 0.1;
    const currentScale = projection.scale();
    const newScale = Math.max(
      100,
      Math.min(currentScale + deltaY * factor, 1000)
    );

    return newScale;
  }
};
