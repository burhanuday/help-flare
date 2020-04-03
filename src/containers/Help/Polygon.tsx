import React from "react";
import { latLng2World, world2Screen } from "./utility";

/* const pt = {lat: SOME_LAT, lng: SOME_LNG);
    const ptScreen =  world2Screen(latLng2World(pt), zoom)
    const ptCorner = world2Screen(latLng2World(svgNW), zoom)
    
    result = { // YOU GOT THE PIXEL COORDINATES OF LAT-LNG POINT pt INSIDE SVG IN px
      x: ptScreen.x - ptCorner.x,
      y: ptScreen.y - ptCorner.y,
    } */

const Polygon: React.FC<any> = (props: any) => {
  let pointsString = props.coordinates.map((coordinate: any) => {
    const ptScreen = world2Screen(
      latLng2World({ lat: coordinate[0], lng: coordinate[1] }),
      props.zoom
    );
    const ptCorner = world2Screen(
      latLng2World({
        lat: props.svgCoordinate[0],
        lng: props.svgCoordinate[1],
      }),
      props.zoom
    );

    return {
      x: ptScreen.x - ptCorner.x,
      y: ptScreen.y - ptCorner.y,
    };
  });

  console.log("points string", pointsString);
  pointsString = pointsString.reduce((total: string, current: any) => {
    return (total += `${current["x"]},${current["y"]} `);
  }, "");
  pointsString = pointsString.substring(0, pointsString.length - 5);
  console.log("points string finished", pointsString);

  return (
    <div>
      {/* viewBox="-8.6 -7.1 16 14"  */}
      <svg width={4000} height={4000}>
        <polygon
          points={pointsString}
          style={{
            fill: "lime",
            stroke: "purple",
            strokeWidth: 0,
            opacity: 0.2,
            fillRule: "nonzero",
          }}
        />
        {/* <polygon
          points="100,10 40,198 190,78 10,78 160,198"
          style={{
            fill: "lime",
            stroke: "purple",
            strokeWidth: 5,
            fillRule: "evenodd",
          }}
        /> */}
      </svg>
    </div>
  );
};

export default Polygon;
