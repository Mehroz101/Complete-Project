import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import "../styles/MapBox.css";
import { useParams } from "react-router-dom";
import { calculateDistance } from "../parkingOwner/components/Functions";

// Replace with your actual Mapbox access token
const TOKEN = "pk.eyJ1IjoibWVocm96ZmFyb29xIiwiYSI6ImNtMGc2ODJqZzE0dDkyanFyamlwdmQ3eTIifQ.tKoAqHa7Fyq96aj59q4vlw";

const MapBox = ({ spaces, onShowDetail, getSpace }) => {
  // Retrieve the search input parameter from the URL
  const { searchInput } = useParams();

  // State to manage the map's viewport (center and zoom), the user's search location, and the search marker instance
  const [viewPort, setViewPort] = useState({
    latitude: 30.439,
    longitude: 72.3552,
    zoom: 12,
  });
  const [searchLocation, setSearchLocation] = useState(null);
  const [searchMarker, setSearchMarker] = useState(null);

  // Refs for the map container, map instance, and an array to hold space markers
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const spaceMarkersRef = useRef([]);

  // Function to filter spaces within a 5 km radius of the provided coordinates
  const getNearbySpaces = (userLat, userLong) => {
    return spaces?.filter((space) => {
      console.log("Space Coordinates:", space.latitude, space.longitude);
      const distance = calculateDistance(
        userLat,
        userLong,
        space.latitude,
        space.longitude
      );
      return distance <= 5; // Only return spaces within 5 km
    });
  };

  // Initialize the Mapbox map when the component mounts
  useEffect(() => {
    // Set the Mapbox access token
    mapboxgl.accessToken = TOKEN;

    // Create a new map instance with the initial viewport settings
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current, // Container DOM element
      style: "mapbox://styles/mehrozfarooq/cm0g6qi11000z01pihk088cvz", // Map style URL
      center: [viewPort.longitude, viewPort.latitude], // Center in [lng, lat] format
      zoom: viewPort.zoom,
    });

    // Add navigation controls (zoom buttons and compass) to the map
    mapRef.current.addControl(new mapboxgl.NavigationControl());

    // Variable to keep track of the marker added by a user click
    let currentMarker = null;

    // Add an event listener for map clicks
    mapRef.current.on("click", (e) => {
      const { lng, lat } = e.lngLat; // Get clicked coordinates (lng, lat)

      // Remove the previous marker (if any) to keep only one click marker at a time
      if (currentMarker) {
        currentMarker.remove();
      }

      // Create a new marker at the clicked location with no offset
      currentMarker = new mapboxgl.Marker({ color: "green", offset: [0, 0] })
        .setLngLat([lng, lat])
        .addTo(mapRef.current);

      // Update the search location state and call the getSpace callback
      setSearchLocation({ latitude: lat, longitude: lng });
      getSpace({ latitude: lat, longitude: lng });
    });

    // Cleanup: Remove the map instance and event listeners when component unmounts
    return () => {
      if (mapRef.current) {
        mapRef.current.off("click");
        mapRef.current.remove();
      }
    };
  }, []);

  // Update the map center and zoom whenever the viewport state changes
  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setCenter([viewPort.longitude, viewPort.latitude]);
      mapRef.current.setZoom(viewPort.zoom);
    }
  }, [viewPort]);

  // Fetch and update location based on the search input provided in the URL
  useEffect(() => {
    const fetchLocation = async () => {
      if (!searchInput?.trim()) return;
      try {
        // Call Mapbox Geocoding API to retrieve location data for the search input
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

        // Extract longitude and latitude from the API response
        const [longitude, latitude] = response.data.features[0].center;
        setSearchLocation({ latitude, longitude });
        getSpace({ latitude, longitude });
        setViewPort({
          latitude,
          longitude,
          zoom: 13,
        });

        // If a search marker already exists, update its location; otherwise, create a new marker
        if (searchMarker) {
          searchMarker.setLngLat([longitude, latitude]);
        } else {
          const newMarker = new mapboxgl.Marker({ color: "green", offset: [0, 0] })
            .setLngLat([longitude, latitude])
            .setPopup(new mapboxgl.Popup().setText("Your Location"))
            .addTo(mapRef.current);
          setSearchMarker(newMarker);
        }
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };

    fetchLocation();
  }, [searchInput]);

  // Update nearby space markers whenever either the spaces data or the search location changes
  useEffect(() => {
    if (!searchLocation) return;

    // Get spaces that are within a 5 km radius of the search location
    const nearbySpaces = getNearbySpaces(
      searchLocation.latitude,
      searchLocation.longitude
    );

    // Remove any existing space markers from the map
    clearSpaceMarkers();

    // For each nearby space, create and add a marker to the map
    nearbySpaces?.forEach((space) => {
      const spaceMarker = new mapboxgl.Marker({ offset: [0, 0] })
        .setLngLat([space.longitude, space.latitude])
        .setPopup(new mapboxgl.Popup().setText(space.title))
        .addTo(mapRef.current);

      // Set the cursor style to pointer on marker hover
      const markerElement = spaceMarker.getElement();
      markerElement.style.cursor = "pointer";

      // Add a click event listener to show details for this space
      markerElement.addEventListener("click", () => {
        onShowDetail(space._id);
      });

      // Keep track of the marker so it can be cleared later
      spaceMarkersRef.current.push(spaceMarker);
    });
  }, [spaces, searchLocation]);

  // Function to remove all space markers from the map
  const clearSpaceMarkers = () => {
    spaceMarkersRef.current.forEach((marker) => marker.remove());
    spaceMarkersRef.current = [];
  };

  // Render the container div for the map
  return (
    <div
      ref={mapContainerRef}
      style={{ height: "100%", width: "100%" }}
    ></div>
  );
};

export default MapBox;
