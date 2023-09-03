
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
// import "./Style.css";
import { Map, Marker, GoogleApiWrapper, InfoWindow } from "google-maps-react";
import { apiLocationDeviceStatusTotalSummary } from "../../services/api";


let MapPage = (props) => {
  const [activeMarker, setActiveMarker] = useState({});
  const [selectedPlace, setSelectedPlace] = useState({});
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [markers, setMarkers] = useState([{ lat: 0, lng: 0 }]);
  const [showingInfoWindow, setShowingInfoWindow] = useState(false); // Added showingInfoWindow state

  useEffect(() => {
    doLoadDeviceReady();
  }, []);

  const doLoadDeviceReady = () => {
    apiLocationDeviceStatusTotalSummary()
      .then((res) => {
        console.log("res: ", res);
        console.log("data: ", res.data);
        console.log("status: ", res.status);
        console.log("records: ", res.data.records);
        if (res.status === 200) {
          if (res.data.records.length > 0) {
            var temp = res.data.records;
            console.log("data temp: ", temp);
            var markerlatLang = [];
            for (var i = 0; i < temp.length; i++) {
              markerlatLang.push({
                lat: temp[i].lat,
                lng: temp[i].long,
                offline: temp[i].offline,
                online: temp[i].online,
                damage: temp[i].damage,

                name: temp[i].location,
              });
            }
            console.log("data lang: ", markerlatLang);
            setMarkers(markerlatLang);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onMarkerClick = (props, marker, e) => {
    console.log("PROPS", props);
    console.log("MARKER", marker);
    console.log("E", e);
    setActiveMarker(marker);
    setSelectedPlace(props.position);
    // setSelectedPlace(props.mapCenter);
    setShowingInfoWindow(true); // Set showingInfoWindow to true
  };

  //   const onMapClick = (props) => {
  //     if (showingInfoWindow) {
  //       setShowingInfoWindow(false); // Set showingInfoWindow to false
  //       setActiveMarker(null);
  //       setSelectedPlace({});
  //     }
  //   };

  // const markerIcon = {
  //   path: "../../../src/assets/images/map_pin.png",
  //   anchor: new props.google.maps.Point(16, 32),
  //   scaledSize: new props.google.maps.Size(32, 32),
  // };

  //   const styles = {
  //     tab: {
  //       minWidth: "10px",
  //     },
  //     tabs: {
  //       minWidth: "10px",
  //     },
  //   };

  const mapStyles = {
    position: "relative",
    width: "96%",
    height: "100%",
  };

  const jabodetabekBounds = {
    north: -5.9055,
    south: -6.4714,
    east: 107.2186,
    west: 106.4383,
  };

  const indonesiaBounds = {
    north: 6,
    south: -11,
    east: 95,
    west: 141,
  };

  const indonesiaCoords = {
    lat: (indonesiaBounds.north + indonesiaBounds.south) / 2,
    lng: (indonesiaBounds.east + indonesiaBounds.west) / 2,
  };
  const jabodetabekCoords = {
    lat: (jabodetabekBounds.north + jabodetabekBounds.south) / 2,
    lng: (jabodetabekBounds.east + jabodetabekBounds.west) / 2,
  };

  return (
    <>
      <div>
        <h3 className="text-lg font-semibold">Peta Lokasi Lemasmil</h3>
      </div>
      <div className="    h-[55vh]
">
        <div>
          <div xs={12}>
            <div
              style={{
                // backgroundColor: "yellow",
                width: "100%",
                minHeight: "50vh",
              }}
            >
              <Map
                google={props.google}
                zoom={5}
                disableDefaultUI={true}
                style={mapStyles}
                initialCenter={indonesiaCoords}
                // initialCenter={jabodetabekCoords}
              >
                {markers.map((marker, index) => (
                  <Marker
                    key={index}
                    icon={
                      {
                        // url: require("../../../src/assets/images/map_pin.png"),
                        // fillColor: "#EB00FF",
                        // fillOpacity: 1,
                        // scale: 0.05,
                        // size: 50
                      }
                    }
                    position={{
                      lat: marker.lat,
                      lng: marker.lng,
                      online: marker.online,
                      offline: marker.offline,
                      damage: marker.damage,
                      nama: marker.name,
                      // last: marker.last,
                    }}
                    onClick={onMarkerClick}
                  />
                ))}
                <InfoWindow marker={activeMarker} visible={showingInfoWindow}>
                  <div>
                  <div className="w-full flex justify-between gap-4">
                      <div className="w-1/2">
                        <h5>Location Name</h5>
                      </div>
                      <div className="w-1/2 font-semibold">
                        {selectedPlace.nama}
                      </div>
                    </div>
                    <div className="w-full flex justify-between gap-4 text-xs">
                      <div className="w-1/2">
                        <h5>Kamera NonAktif</h5>
                      </div>
                      <div className="w-1/2">
                        {selectedPlace.offline}
                      </div>
                    </div>
                    <div className="w-full flex justify-between gap-4 text-xs">
                      <div className="w-1/2">
                      <h5>Kamera Rusak</h5>
                      </div>
                      <div className="w-1/2">
                        {selectedPlace.damage}
                      </div>
                    </div>
                    <div className="w-full flex justify-between gap-4 text-xs">
                      <div className="w-1/2">
                      <h5>Kamera Aktif</h5>
                      </div>
                      <div className="w-1/2">
                        {selectedPlace.online}
                      </div>
                    </div>
                  </div>
                </InfoWindow>
              </Map>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyAvM9Ow4c24huLBdFS3dFw9byoNa-UkmfI",
})(MapPage);
