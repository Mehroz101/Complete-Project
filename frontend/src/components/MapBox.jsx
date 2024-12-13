import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import "../styles/MapBox.css";
import { useParams } from "react-router-dom";
import { calculateDistance } from "../parkingOwner/components/Functions";
const TOKEN = import.meta.env.REACT_APP_TOKEN;

const MapBox = ({ spaces, onShowDetail, getSpace }) => {
  const { searchInput } = useParams();
  const [viewPort, setViewPort] = useState({
    latitude: 30.439,
    longitude: 72.3552,
    zoom: 12,
  });
  const [searchLocation, setSearchLocation] = useState(null);
  const [searchMarker, setSearchMarker] = useState(null); // State to manage the search marker
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const spaceMarkersRef = useRef([]);

  // Filter locations within 5 km
  const getNearbySpaces = (userLat, userLong) => {
    return spaces?.filter((space) => {
      const distance = calculateDistance(
        userLat,
        userLong,
        space.latitude,
        space.longitude
      );
      return distance <= 5; // Only show spaces within 5 km
    });
  };

  useEffect(() => {
    mapboxgl.accessToken = TOKEN;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mehrozfarooq/cm0g6qi11000z01pihk088cvz",
      center: [viewPort.longitude, viewPort.latitude],
      zoom: viewPort.zoom,
    });

    mapRef.current.addControl(new mapboxgl.NavigationControl());

    // Declare a variable to track the current marker
    let currentMarker = null;

    // Add single-click event listener to the map
    mapRef.current.on("click", (e) => {
      const { lng, lat } = e.lngLat; // Get longitude and latitude of the clicked point
      //console.log("Clicked at:", lng, lat); // Log for debugging

      // Remove the previous marker if it exists
      if (currentMarker) {
        currentMarker.remove();
      }

      // Create a new marker and add it to the map
      currentMarker = new mapboxgl.Marker({ color: "green" })
        .setLngLat([lng, lat])
        .addTo(mapRef.current);

      // Update the search location and fetch nearby spaces
      setSearchLocation({ latitude: lat, longitude: lng });
      getSpace({ latitude: lat, longitude: lng });
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.off("click"); // Clean up event listener on component unmount
        mapRef.current.remove();
      }
    };
  }, []);

  // Update map center when viewPort changes
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setCenter([viewPort.longitude, viewPort.latitude]);
      mapRef.current.setZoom(viewPort.zoom);
    }
  }, [viewPort]);

  // Fetch location based on user input
  useEffect(() => {
    const fetchLocation = async () => {
      if (!searchInput?.trim()) return;

      try {
        const response = await axios.get(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
            searchInput
          )}.json`,
          {
            params: {
              access_token: TOKEN,
              limit: 1,
            },
          }
        );

        const [longitude, latitude] = response.data.features[0].center;
        setSearchLocation({ latitude, longitude });
        getSpace({ latitude, longitude });
        setViewPort({
          latitude,
          longitude,
          zoom: 13,
        });

        // Move or create search marker
        if (searchMarker) {
          searchMarker.setLngLat([longitude, latitude]); // Move existing marker
        } else {
          const newMarker = new mapboxgl.Marker({ color: "green" })
            .setLngLat([longitude, latitude])
            .setPopup(new mapboxgl.Popup().setText("Your Location"))
            .addTo(mapRef.current);
          setSearchMarker(newMarker); // Update state with the new marker
        }
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };

    fetchLocation();
  }, [searchInput]);

  // Update nearby spaces based on search location
  useEffect(() => {
    if (!searchLocation) return;

    const nearbySpaces = getNearbySpaces(
      searchLocation.latitude,
      searchLocation.longitude
    );
    clearSpaceMarkers(); // Clear existing markers

    nearbySpaces?.forEach((space) => {
      const spaceMarker = new mapboxgl.Marker()
        .setLngLat([space.longitude, space.latitude])
        .setPopup(new mapboxgl.Popup().setText(space.title))
        .addTo(mapRef.current);

      const markerElement = spaceMarker.getElement();
      markerElement.style.cursor = "pointer";

      markerElement.addEventListener("click", () => {
        onShowDetail(space._id);
      });
      spaceMarkersRef.current.push(spaceMarker);
    });
  }, [spaces, searchLocation]);

  const clearSpaceMarkers = () => {
    spaceMarkersRef.current.forEach((marker) => marker.remove());
    spaceMarkersRef.current = []; // Clear the reference array
  };

  return (
    <div ref={mapContainerRef} style={{ height: "100%", width: "100%" }}></div>
  );
};

export default MapBox;
