import React, { Component } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";

export class MapContainer extends Component {
  render() {
    return (
      <Map
        google={this.props.google}
        zoom={10}
        /* style={{
          width: "100%",
          height: "100%"
        }}
        containerStyle={{
          position: "relative",
          width: "100%",
          height: "100%"
        }} */
        initialCenter={{
          lat: 19.0748,
          lng: 72.8856
        }}
      >
        {/* <Marker onClick={this.onMarkerClick} name={"Current location"} />

        <InfoWindow onClose={this.onInfoWindowClose}>
          <div>
            <h1>{this.state.selectedPlace.name}</h1>
          </div>
        </InfoWindow> */}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB_6Gc31BMUDvuSEMz8AYWjTbza4UvytmQ"
})(MapContainer);
