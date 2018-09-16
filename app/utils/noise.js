// https://www.michaelbromley.co.uk/blog/simple-1d-noise-in-javascript/

const MAX_VERTICES = 256;
const MAX_VERTICES_MASK = MAX_VERTICES - 1;
const amplitude = 5;
const scale = 0.1;

const vertices = [];

for (let i = 0; i < MAX_VERTICES; ++i) {
  vertices.push(Math.random());
}

export default function getVal(x) {
  const scaledX = x * scale;
  const xFloor = Math.floor(scaledX);
  const t = scaledX - xFloor;
  const tRemapSmoothstep = t * t * (3 - 2 * t);

  // Modulo using &
  const xMin = xFloor & MAX_VERTICES_MASK;
  const xMax = (xMin + 1) & MAX_VERTICES_MASK;

  const y = lerp(vertices[xMin], vertices[xMax], tRemapSmoothstep);

  return y * amplitude;
}

function lerp(a, b, t) {
  return a * (1 - t) + b * t;
}
