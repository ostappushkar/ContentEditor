import React from "react";
import {
  GoogleMap,
  withGoogleMap,
  withScriptjs,
  Marker
} from "react-google-maps";
import { compose, withProps } from "recompose";
import { TextField } from "@material-ui/core";
import StandaloneSearchBox from "react-google-maps/lib/components/places/StandaloneSearchBox";
interface IMapState {
  lat: number;
  lng: number;
  address: string;
}
interface IMapProps {
  input: any;
  label: string;
  name: string;
  location: object;
}
class MapGoogle extends React.Component<IMapProps, IMapState> {
  private onSearchBoxMounted = React.createRef<any>();
  constructor(props: any) {
    super(props);
    this.state = {
      lat: 49.83968300000001,
      lng: 24.02971699999999,
      address: "Lviv"
    };
  }
  componentDidMount() {
    if (this.props.location !== undefined) {
      this.setState(this.props.location);
      this.props.input.onChange(this.props.location);
    } else {
      this.props.input.onChange(this.state);
    }
  }
  onPlacesChanged = () => {
    const places = this.onSearchBoxMounted.current.getPlaces();
    this.setState({
      lat: places[0].geometry.location.lat(),
      lng: places[0].geometry.location.lng(),
      address: places[0].formatted_address
    });
    this.props.input.onChange(this.state);
  };
  render() {
    return (
      <div>
        <StandaloneSearchBox
          {...this.props.input}
          ref={this.onSearchBoxMounted}
          onPlacesChanged={this.onPlacesChanged}
        >
          <TextField
            className="placesSearchBox"
            style={{ width: "100%" }}
            placeholder="Search your location..."
          />
        </StandaloneSearchBox>
        <GoogleMap
          defaultZoom={10}
          center={{ lng: this.state.lng, lat: this.state.lat }}
          defaultCenter={{ lng: this.state.lng, lat: this.state.lat }}
        >
          <Marker position={{ lng: this.state.lng, lat: this.state.lat }} />
        </GoogleMap>
      </div>
    );
  }
}
export default compose(
  withProps({
    googleMapURL: process.env.REACT_APP_GOOGLE_API_URL,
    loadingElement: (
      <div className="loadingElement" style={{ height: `100%` }} />
    ),
    containerElement: (
      <div className="mapContainer" style={{ height: `100%` }} />
    ),
    mapElement: <div className="mapElement" style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(MapGoogle);
