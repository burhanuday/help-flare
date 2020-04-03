const TILE_SIZE = 256;

function latLng2World({ lat, lng }: { lat: number; lng: number }) {
  const sin = Math.sin((lat * Math.PI) / 180);
  const x = lng / 360 + 0.5;
  let y = 0.5 - (0.25 * Math.log((1 + sin) / (1 - sin))) / Math.PI;

  y = y < -1 ? -1 : y > 1 ? 1 : y;
  return { x, y };
}

function world2Screen({ x, y }: { x: number; y: number }, zoom: number) {
  const scale = Math.pow(2, zoom);
  return {
    x: x * scale * TILE_SIZE, // TILE_SIZE = 256
    y: y * scale * TILE_SIZE,
  };
}

export { latLng2World, world2Screen };
