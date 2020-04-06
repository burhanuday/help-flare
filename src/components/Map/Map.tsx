import React from "react";

const Map = (props: any) => {
  return (
    <Map
      // @ts-ignore
      containerStyle={{
        width: "100%",
        position: "relative",
      }}
      onReady={props.onReady}
      streetViewControl={false}
      disableDoubleClickZoom={true}
      gestureHandling="greedy"
      /*  onCenter_changed={(a: any, b: any, c: any) => {
          console.log(b.center.lat(), b.center.lng());
          // const latLng = a.paths[0];
          const lat = b.center.lat();
          const lng = b.center.lng();
          if (center) {
            if (center.lat !== lat || center.lng !== lng)
              setCenter({
                lat,
                lng,
              });
          }
        }} */
      /* onZoom_changed={(a: any, b: any, c: any) => {
          console.log(a, b, c);
          if(b.zoom){
            
          }
        }} */
      initialCenter={props.initialCenter}
      google={props.google}
      zoom={14}
      onClick={props.onClick}
    >
      {props.children}
    </Map>
  );
};

export default Map;
