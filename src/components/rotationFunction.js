export const rotationFunction = ({ path, selc, projection, paths }) => {
  let isDraging = false;
  let lastX = 0;
  let lastY = 0;

  selc.on("mousedown", (e) => {
    isDraging = true;
    lastX = e.clientX;
    lastY = e.clientY;
  });

  selc.on("mousemove", (e) => {
    if (isDraging) {
      const newX = e.clientX;
      const newY = e.clientY;
      const deltaX = newX - lastX;
      const deltaY = newY - lastY;

      const currentRotation = projection.rotate();

      const newRotation = [
        currentRotation[0] + deltaX * 0.1,
        currentRotation[1] + deltaY * 0.1,
        currentRotation[2],
      ];
      const clampedRotation = clampRotation(newRotation, -360, 360);

      projection.rotate(clampedRotation);

      paths.attr("d", path);
      lastX = newX;
    }
  });

  selc.on("mouseup", () => {
    isDraging = false;
  });

  function clampRotation(rotation, min, max) {
    return [
      Math.min(Math.max(rotation[0], min), max),
      Math.min(Math.max(rotation[1], min), max),
      rotation[2],
    ];
  }
};
