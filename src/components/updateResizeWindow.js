export function updateResizeWindow({
  selc,
  width,
  height,
  projection,
  paths,
  path,
  transition,
}) {
  const scaleMesure = Math.min(width, height) / 2;
  const translateX = width / 2;
  const translateY = height / 2;

  projection.scale(scaleMesure).translate([translateX, translateY]);
  paths.attr("d", path).attr("transition", transition);
  selc.selectAll("path.outline").attr("d", path);
}
