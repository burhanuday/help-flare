import React from "react";
import Polyline from "./Polyline";
import toPoints from "./toPoints";

const Group = ({ bounds, coords, options, ptCorner, zoom }) => {
  ptCorner = ptCorner || toPoints(bounds[0], bounds[1], zoom);
  const polylines = [];
  for (let i = 0; i < coords.length; i++) {
    polylines.push(
      <Polyline key={i} coords={coords[i]} ptCorner={ptCorner} zoom={zoom} />
    );
  }
  return <g {...options}>{polylines}</g>;
};

export default Group;
