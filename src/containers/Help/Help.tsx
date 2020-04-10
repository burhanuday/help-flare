import React, { useEffect, useState, useContext, useCallback } from "react";
import {
  Map,
  GoogleApiWrapper,
  Polygon,
  InfoWindow,
  Marker,
} from "google-maps-react";
import Header from "../../components/Header/Header";
import socketIOClient from "socket.io-client";
import { geolocated } from "react-geolocated";
import {
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
} from "@material-ui/core";
import axios from "../../axios/axios";
import { Alert } from "@material-ui/lab";
import { ProfileContext } from "../../contexts/ProfileContext";
import { useHistory } from "react-router-dom";
import {
  sendEvent,
  FIREBASE_HELP_OPENED,
  FIREBASE_HELP_ERROR,
} from "../../util/analytics";

const MapContainer = (props: any) => {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [socket, setSocket] = useState<SocketIOClient.Socket>();
  const [showMarkers, setShowMarkers] = useState<boolean>(true);
  const [infoWindow, setInfoWindow] = useState<any>({
    visible: false,
    data: null,
    showConfirmDialog: false,
    result: null,
  });
  const [center, setCenter] = useState<any>();
  const { profileState, profileActions } = useContext(ProfileContext);
  const hasPendingClaims = profileState?.profile?.claims?.length > 0;

  let history = useHistory();

  const getData = useCallback(() => {
    console.log("from callback");
    socket?.emit("new_help", {
      lat: props.coords.latitude,
      lng: props.coords.longitude,
    });
  }, [props.coords, socket]);

  useEffect(() => {
    sendEvent(FIREBASE_HELP_OPENED);
  }, []);

  useEffect(() => {
    let socket: SocketIOClient.Socket;
    if (props.isGeolocationAvailable && props.isGeolocationEnabled) {
      if (props.coords && props.coords.latitude && props.coords.longitude) {
        socket = socketIOClient(process.env.REACT_APP_API_URL as string);
        setSocket(socket);
        socket.on("helps", (data: any) => {
          console.log("data from socket", data);
          setData(data);
        });
        socket.emit("new_help", {
          lat: props.coords.latitude,
          lng: props.coords.longitude,
        });
      }
    }
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [props.coords, props.isGeolocationAvailable, props.isGeolocationEnabled]);

  useEffect(() => {
    if (props.coords) {
      setCenter({
        lat: props.coords.latitude,
        lng: props.coords.longitude,
      });
    }
  }, [props.coords]);

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
      }}
    >
      <Header title="Help" />
      {infoWindow.showConfirmDialog && (
        <Dialog
          style={{
            zIndex: 9000,
          }}
          open={infoWindow.showConfirmDialog}
        >
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              You must click a picture of the help provided and upload it after
              you are done. You will not be able to claim any other sites till
              that time
            </DialogContentText>
            <Typography color="error" variant="body1">
              Please provide the help in under 24 hours of pressing "Agree" /
              कृपया "OK" दबाने के 24 घंटे के भीतर सहायता प्रदान करें
            </Typography>
            <Typography color="textSecondary" variant="body2">
              We will contact you in case of any problems / हम किसी भी समस्या के
              मामले में आपसे संपर्क करेंगे
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              disabled={loading}
              onClick={() => {
                setInfoWindow({
                  data: null,
                  visible: false,
                  showConfirmDialog: false,
                  result: null,
                });
              }}
              color="primary"
            >
              Cancel
            </Button>
            <Button
              disabled={loading}
              onClick={() => {
                setLoading(true);
                axios
                  .post(`/help?helpId=${infoWindow.data._id}`)
                  .then(response => {
                    if (response.data.error === 0) {
                      console.log("response", response);
                      getData();
                      setInfoWindow({
                        ...infoWindow,
                        result: response.data.message,
                        showConfirmDialog: false,
                      });
                      profileActions.fetchProfile();
                      setTimeout(() => {
                        history.replace("/home");
                      }, 3000);
                    }
                    /* setTimeout(() => {
                      history.replace("/home");
                    }, 4000); */
                  })
                  .catch(error => {
                    console.log(error);
                    sendEvent(FIREBASE_HELP_ERROR, error);
                    setInfoWindow({
                      ...infoWindow,
                      result: "There was an error!",
                      showConfirmDialog: false,
                    });
                  })
                  .finally(() => {
                    setLoading(false);
                  });
              }}
              color="primary"
              autoFocus
            >
              OK
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {infoWindow.visible && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 8000,
            width: "100vw",
          }}
        >
          <Snackbar
            onClose={() => {
              setInfoWindow({
                result: null,
                data: null,
                visible: false,
                showConfirmDialog: false,
              });
            }}
            open={!!infoWindow.result}
            autoHideDuration={3000}
          >
            <Alert
              onClose={event =>
                setInfoWindow({
                  result: null,
                  data: null,
                  visible: false,
                  showConfirmDialog: false,
                })
              }
              severity={
                infoWindow.result === "Help is under delivery for this area."
                  ? "error"
                  : "success"
              }
              variant="filled"
            >
              {infoWindow.result}
            </Alert>
          </Snackbar>
          <Dialog open={infoWindow.visible}>
            <DialogTitle id="alert-dialog-title">Help required</DialogTitle>
            <DialogContent>
              <Typography variant="body2">
                Reported by / रिपोर्ट द्वारा: {infoWindow.data.reported_by}
              </Typography>
              <Typography variant="body2">
                Contact / संपर्क: {infoWindow.data.phone}
              </Typography>
              <Typography variant="body2">
                Help required / सहायता की आवश्यकता:{" "}
                {infoWindow.data.type_of_help.join(", ")}
              </Typography>
              <Typography variant="body2">
                Place / स्थान: {infoWindow.data.place}
              </Typography>
              <Typography variant="body2">
                More information / अधिक जानकारी: {infoWindow.data.message}
              </Typography>
              {infoWindow.data.status === 1 && (
                <Typography variant="h6">
                  Helper is already assigned for this area / हेल्पर को इस
                  क्षेत्र के लिए पहले से ही सौंपा गया है
                </Typography>
              )}

              {hasPendingClaims && (
                <Typography variant="body2" color="error">
                  Verify your current claim before claiming this area <br />
                  You can do this by pressing verify on the home screen <br />
                  इस क्षेत्र का दावा करने से पहले अपने वर्तमान दावे को साबित
                  करें <br />
                  होम स्क्रीन पर वेरिफिकेशन दबाकर आप ऐसा कर सकते हैं
                </Typography>
              )}
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setInfoWindow({
                    visible: false,
                    data: null,
                    showConfirmDialog: false,
                    result: null,
                  });
                }}
                size="small"
                color="primary"
              >
                Cancel
              </Button>
              <Button
                disabled={infoWindow.data.status === 1 || hasPendingClaims}
                onClick={() => {
                  setInfoWindow({
                    ...infoWindow,
                    showConfirmDialog: true,
                  });
                }}
                size="small"
                color="primary"
                variant="contained"
              >
                I will help
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      )}
      {center && (
        <Map
          streetViewControl={false}
          // @ts-ignore
          onZoom_changed={(a: any, b: any, c: any) => {
            let showMarkerInsteadOfPoly: boolean;
            if (b.zoom) {
              showMarkerInsteadOfPoly = b.zoom <= 15;
              console.log("show markers", showMarkerInsteadOfPoly);
              if (showMarkerInsteadOfPoly !== showMarkers) {
                setShowMarkers(showMarkerInsteadOfPoly);
              }
            }
          }}
          disableDoubleClickZoom={true}
          gestureHandling="greedy"
          initialCenter={{
            lat: center.lat,
            lng: center.lng,
          }}
          google={props.google}
          zoom={14}
        >
          {showMarkers &&
            data.map((d: any) => {
              const coordinates = d.area.coordinates[0];
              const loc = coordinates[0];
              const color = d.status
                ? "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
                : "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";
              return (
                <Marker
                  key={`${loc[0]}${loc[1]}`}
                  position={{ lat: loc[0], lng: loc[1] }}
                  icon={color}
                  onClick={(a: any, b: any, c: any) => {
                    console.log(a, b, c);
                    b.map.setZoom(16);
                    setCenter({
                      lat: loc[0],
                      lng: loc[1],
                    });
                    setInfoWindow({
                      visible: true,
                      data: d,
                      showConfirmDialog: false,
                      result: null,
                    });
                  }}
                />
              );
            })}
          {!showMarkers &&
            data.map((d: any) => {
              const coordinates = d.area.coordinates[0];
              const poly_lines = coordinates.map((coordinate: any) => ({
                lat: coordinate[0],
                lng: coordinate[1],
              }));
              const color = d.status === 1 ? "green" : "blue";
              return (
                <Polygon
                  key={`${coordinates[0][0]}${coordinates[0][1]}`}
                  paths={poly_lines}
                  strokeColor={color}
                  strokeOpacity={0.8}
                  strokeWeight={2}
                  fillColor={color}
                  fillOpacity={0.35}
                  onClick={(a: any, b: any, c: any) => {
                    console.log(a, b, c);
                    const latLng = a.paths[0];
                    b.map.setZoom(16);
                    setCenter({
                      lat: latLng.lat,
                      lng: latLng.lng,
                    });
                    setInfoWindow({
                      visible: true,
                      data: d,
                      showConfirmDialog: false,
                      result: null,
                    });
                  }}
                />
              );
            })}
        </Map>
      )}
    </div>
  );
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_MAP_KEY as string,
})(
  geolocated({
    positionOptions: {
      enableHighAccuracy: true,
    },
    userDecisionTimeout: 5000,
  })(MapContainer)
);
