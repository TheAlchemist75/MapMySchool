// import React, { useState, useEffect, useRef } from "react";
// import mapboxgl from "mapbox-gl";
// import MapGL, { Source, Layer } from "react-map-gl";
// import Directions from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
// import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
// import axios from "axios";
// import "./MapSchool.css";

// mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

// const apiUrls = {
//   jugendberufshilfen:
//     "https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Jugendberufshilfen_FL_1/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson",
//   kindertageseinrichtungen:
//     "https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Kindertageseinrichtungen_Sicht/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson",
//   schulsozialarbeit:
//     "https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Schulsozialarbeit_FL_1/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson",
//   schulen:
//     "https://services6.arcgis.com/jiszdsDupTUO3fSM/arcgis/rest/services/Schulen_OpenData/FeatureServer/0/query?outFields=*&where=1%3D1&f=geojson",
// };

// function MapSchool({ token }) {
//   const mapRef = useRef(null);
//   const [selectedData, setSelectedData] = useState("jugendberufshilfen");
//   const [mapLoaded, setMapLoaded] = useState(false);
//   const [data, setData] = useState(null);

//   const fetchData = async (type) => {
//     try {
//       const response = await axios.get(apiUrls[type]);
//       setData(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchData(selectedData);
//   }, [selectedData]);

//   const handleMapLoad = () => {
//     setMapLoaded(true);
//     const map = mapRef.current.getMap();

//     if (!map.isStyleLoaded()) {
//       map.on("style.load", () => {
//         addMapLayers(map);
//       });
//     } else {
//       addMapLayers(map);
//     }

//     const directions = new Directions({
//       accessToken: mapboxgl.accessToken,
//       unit: "metric",
//       profile: "mapbox/driving",
//     });

//     map.addControl(directions, "top-left");
//   };

//   const addMapLayers = (map) => {
//     map.on("click", "data-layer", (e) => {
//       const coordinates = e.features[0].geometry.coordinates.slice();
//       const properties = e.features[0].properties;
//       const popupContent = `
//         <div>
//           <strong>${properties.NAME || properties.TRAEGER}</strong><br/>
//           ${properties.LEISTUNGEN ? `Leistungen: ${properties.LEISTUNGEN}<br/>` : ""}
//           Adresse: ${properties.STRASSE}, ${properties.PLZ} ${properties.ORT}<br/>
//           Telefon: ${properties.TELEFON}
//         </div>
//       `;

//       new mapboxgl.Popup({ offset: 25 })
//         .setLngLat(coordinates)
//         .setHTML(popupContent)
//         .addTo(map);
//     });

//     map.on("mouseenter", "data-layer", () => {
//       map.getCanvas().style.cursor = "pointer";
//     });

//     map.on("mouseleave", "data-layer", () => {
//       map.getCanvas().style.cursor = "";
//     });
//   };

//   const handleDataChange = (event) => {
//     setSelectedData(event.target.value);
//   };

//   return (
//     <div
//       style={{
//         width: "100%",
//         height: "calc(100vh - 70px)",
//         position: "relative",
//       }}
//     >
//       <div className="dropdown-container">
//         <label htmlFor="data-select">Select Data: </label>
//         <select
//           id="data-select"
//           value={selectedData}
//           onChange={handleDataChange}
//         >
//           <option value="jugendberufshilfen">Jugendberufshilfen</option>
//           <option value="kindertageseinrichtungen">
//             Kindertageseinrichtungen
//           </option>
//           <option value="schulsozialarbeit">Schulsozialarbeit</option>
//           <option value="schulen">Schulen</option>
//         </select>
//       </div>

//       <MapGL
//         ref={mapRef}
//         mapboxApiAccessToken={mapboxgl.accessToken}
//         initialViewState={{
//           longitude: 12.92922,
//           latitude: 50.8357,
//           zoom: 12.5,
//           pitch: 60,
//           attributionControl: false,
//           projection: "globe",
//         }}
//         style={{ width: "100%", height: "100%" }}
//         mapStyle="mapbox://styles/alchemist75/clwhv8vyk00pe01r00pxh11qo"
//         onLoad={handleMapLoad}
//       >
//         {mapLoaded && data && (
//           <Source id="data-source" type="geojson" data={data}>
//             <Layer
//               id="data-layer"
//               type="symbol"
//               layout={{
//                 "icon-image": "mapbox-circle",
//                 "icon-size": 1,
//               }}
//               interactive={true}
//             />
//           </Source>
//         )}

//         <div className="custom-attribution">
//           <a
//             href="https://www.mapbox.com/about/maps"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             © Mapbox
//           </a>{" "}
//           <a
//             href="https://www.openstreetmap.org/about/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             © OpenStreetMap
//           </a>{" "}
//           <a
//             href="https://www.mapbox.com/map-feedback/"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Improve this map
//           </a>
//         </div>
//       </MapGL>
//     </div>
//   );
// }

// export default MapSchool;

// -------------------------------------------------------

import React, { useState, useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import MapGL, { Source, Layer } from "react-map-gl";
import Directions from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css";
import axios from "axios";
import config from "../../config";
import "./MapSchool.css";

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN;

const apiUrls = {
  jugendberufshilfen: `${config.backendUrl}/api/data/jugendberufshilfen`,
  kindertageseinrichtungen: `${config.backendUrl}/api/data/kindertageseinrichtungen`,
  schulsozialarbeit: `${config.backendUrl}/api/data/schulsozialarbeit`,
  schulen: `${config.backendUrl}/api/data/schulen`,
};

const transformToGeoJSON = (data) => {
  return {
    type: "FeatureCollection",
    features: data.features.map((feature) => ({
      type: "Feature",
      geometry: feature.geometry,
      properties: feature.properties,
    })),
  };
};

function MapSchool({ token }) {
  const mapRef = useRef(null);
  const [selectedData, setSelectedData] = useState("jugendberufshilfen");
  const [mapLoaded, setMapLoaded] = useState(false);
  const [data, setData] = useState(null);

  const fetchData = async (type) => {
    try {
      const response = await axios.get(apiUrls[type]);
      const geoJsonData = transformToGeoJSON(response.data);
      setData(geoJsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData(selectedData);
  }, [selectedData]);

  const handleMapLoad = () => {
    setMapLoaded(true);
    const map = mapRef.current.getMap();

    if (!map.isStyleLoaded()) {
      map.on("style.load", () => {
        addMapLayers(map);
      });
    } else {
      addMapLayers(map);
    }

    const directions = new Directions({
      accessToken: mapboxgl.accessToken,
      unit: "metric",
      profile: "mapbox/driving",
    });

    map.addControl(directions, "top-left");
  };

  const addMapLayers = (map) => {
    map.on("click", "data-layer", (e) => {
      const coordinates = e.features[0].geometry.coordinates.slice();
      const properties = e.features[0].properties;
      const popupContent = `
        <div>
          <strong>${properties.NAME || properties.TRAEGER}</strong><br/>
          ${properties.LEISTUNGEN ? `Leistungen: ${properties.LEISTUNGEN}<br/>` : ""}
          Adresse: ${properties.STRASSE}, ${properties.PLZ} ${properties.ORT}<br/>
          Telefon: ${properties.TELEFON}
        </div>
      `;

      new mapboxgl.Popup({ offset: 25 })
        .setLngLat(coordinates)
        .setHTML(popupContent)
        .addTo(map);
    });

    map.on("mouseenter", "data-layer", () => {
      map.getCanvas().style.cursor = "pointer";
    });

    map.on("mouseleave", "data-layer", () => {
      map.getCanvas().style.cursor = "";
    });
  };

  const handleDataChange = (event) => {
    setSelectedData(event.target.value);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "calc(100vh - 70px)",
        position: "relative",
      }}
    >
      <div className="dropdown-container">
        <label htmlFor="data-select">Select Data: </label>
        <select
          id="data-select"
          value={selectedData}
          onChange={handleDataChange}
        >
          <option value="jugendberufshilfen">Jugendberufshilfen</option>
          <option value="kindertageseinrichtungen">
            Kindertageseinrichtungen
          </option>
          <option value="schulsozialarbeit">Schulsozialarbeit</option>
          <option value="schulen">Schulen</option>
        </select>
      </div>

      <MapGL
        ref={mapRef}
        mapboxApiAccessToken={mapboxgl.accessToken}
        initialViewState={{
          longitude: 12.92922,
          latitude: 50.8357,
          zoom: 12.5,
          pitch: 60,
          attributionControl: false,
          projection: "globe",
        }}
        style={{ width: "100%", height: "100%" }}
        mapStyle="mapbox://styles/alchemist75/clwhv8vyk00pe01r00pxh11qo"
        onLoad={handleMapLoad}
      >
        {mapLoaded && data && (
          <Source id="data-source" type="geojson" data={data}>
            <Layer
              id="data-layer"
              type="symbol"
              layout={{
                "icon-image": "mapbox-circle",
                "icon-size": 1,
              }}
              interactive={true}
            />
          </Source>
        )}

        <div className="custom-attribution">
          <a
            href="https://www.mapbox.com/about/maps"
            target="_blank"
            rel="noopener noreferrer"
          >
            © Mapbox
          </a>{" "}
          <a
            href="https://www.openstreetmap.org/about/"
            target="_blank"
            rel="noopener noreferrer"
          >
            © OpenStreetMap
          </a>{" "}
          <a
            href="https://www.mapbox.com/map-feedback/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Improve this map
          </a>
        </div>
      </MapGL>
    </div>
  );
}

export default MapSchool;
