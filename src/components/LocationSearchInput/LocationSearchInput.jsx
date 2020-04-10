import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { classnames } from "./helpers";
import "./LocationSearchInput.css";
import { TextField } from "@material-ui/core";

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      errorMessage: "",
      latitude: null,
      longitude: null,
      isGeocoding: false,
    };
  }

  handleChange = address => {
    this.setState({
      address,
      latitude: null,
      longitude: null,
      errorMessage: "",
    });
    this.props.setGeoData({
      ...this.props.geoData,
      address,
      latitude: null,
      longitude: null,
      errorMessage: "",
    });
  };

  handleSelect = selected => {
    this.setState({ isGeocoding: true, address: selected });
    this.props.setGeoData({
      ...this.props.geoData,
      isGeocoding: true,
      address: selected,
    });
    geocodeByAddress(selected)
      .then(res => getLatLng(res[0]))
      .then(({ lat, lng }) => {
        this.setState({
          latitude: lat,
          longitude: lng,
          isGeocoding: false,
        });
        this.props.setGeoData({
          ...this.props.geoData,
          latitude: lat,
          longitude: lng,
          isGeocoding: false,
        });
      })
      .catch(error => {
        this.setState({ isGeocoding: false });
        console.log("error", error); // eslint-disable-line no-console
      });
  };

  handleCloseClick = () => {
    this.setState({
      address: "",
      latitude: null,
      longitude: null,
    });
    this.props.setGeoData({
      ...this.props.geoData,
      address: "",
      latitude: null,
      longitude: null,
    });
  };

  handleError = (status, clearSuggestions) => {
    console.log("Error from Google Maps API", status); // eslint-disable-line no-console
    this.setState({ errorMessage: status }, () => {
      clearSuggestions();
    });
    this.props.setGeoData({ ...this.props.geoData, errorMessage: status });
  };

  render() {
    const { address, errorMessage } = this.state;

    return (
      <div>
        <PlacesAutocomplete
          onChange={this.handleChange}
          value={address}
          onSelect={this.handleSelect}
          onError={this.handleError}
          shouldFetchSuggestions={address.length > 3}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps }) => {
            return (
              <div className="Demo__search-bar-container">
                <div className="Demo__search-input-container">
                  <TextField
                    required
                    fullWidth
                    label="Area / आसपास का क्षेत्र"
                    placeholder="eg. Bandra East"
                    variant="outlined"
                    {...getInputProps({
                      placeholder: "eg. Bandra East",
                      className: "Demo__search-input",
                    })}
                    disabled={this.props.disabled}
                  />
                  {/* <input
                    {...getInputProps({
                      placeholder: "Enter your vicinity",
                      className: "Demo__search-input"
                    })}
                  /> */}
                  {this.state.address.length > 0 && (
                    <button
                      className="Demo__clear-button"
                      onClick={this.handleCloseClick}
                    >
                      x
                    </button>
                  )}
                </div>
                {suggestions.length > 0 && (
                  <div className="Demo__autocomplete-container">
                    {suggestions.map(suggestion => {
                      const className = classnames("Demo__suggestion-item", {
                        "Demo__suggestion-item--active": suggestion.active,
                      });

                      return (
                        /* eslint-disable react/jsx-key */
                        <div
                          {...getSuggestionItemProps(suggestion, { className })}
                        >
                          <strong>
                            {suggestion.formattedSuggestion.mainText}
                          </strong>{" "}
                          <small>
                            {suggestion.formattedSuggestion.secondaryText}
                          </small>
                        </div>
                      );
                      /* eslint-enable react/jsx-key */
                    })}
                    {/* <div className="Demo__dropdown-footer">
                      <div>
                        <img
                          src={require("../images/powered_by_google_default.png")}
                          className="Demo__dropdown-footer-image"
                        />
                      </div>
                    </div> */}
                  </div>
                )}
              </div>
            );
          }}
        </PlacesAutocomplete>
        {errorMessage.length > 0 && (
          <div className="Demo__error-message">{this.state.errorMessage}</div>
        )}

        {/*  {((latitude && longitude) || isGeocoding) && (
          <div>
            <h3 className="Demo__geocode-result-header">Geocode result</h3>
            {isGeocoding ? (
              <div>
                <i className="fa fa-spinner fa-pulse fa-3x fa-fw Demo__spinner" />
              </div>
            ) : (
              <div>
                <div className="Demo__geocode-result-item--lat">
                  <label>Latitude:</label>
                  <span>{latitude}</span>
                </div>
                <div className="Demo__geocode-result-item--lng">
                  <label>Longitude:</label>
                  <span>{longitude}</span>
                </div>
              </div>
            )}
          </div>
        )} */}
      </div>
    );
  }
}

export default SearchBar;
