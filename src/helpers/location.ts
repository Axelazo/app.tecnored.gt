/**
 * Get nearby location coordinates within a specified distance range.
 *
 * @param {number} lat - The latitude of the center point.
 * @param {number} lng - The longitude of the center point.
 * @param {number} distance - The distance range in kilometers.
 * @param {number} [numLocations=5] - The maximum number of nearby locations to return.
 * @returns {Array<{ lat: number, lng: number }>} - An array of nearby location coordinates.
 */
export function getNearbyLocations(
  lat: number,
  lng: number,
  distance: number,
  numLocations = 5
) {
  // Constants for latitude and longitude conversions
  const DEG_TO_RAD = Math.PI / 180;
  const EARTH_RADIUS = 6371; // Earth's radius in kilometers

  // Convert distance to radians
  const distanceRad = distance / EARTH_RADIUS;

  // Convert center point coordinates to radians
  const centerLatRad = lat * DEG_TO_RAD;
  const centerLngRad = lng * DEG_TO_RAD;

  const locations = [];

  // Generate random nearby locations
  while (locations.length < numLocations) {
    // Generate random bearing (in radians)
    const bearingRad = Math.random() * 2 * Math.PI;

    // Generate random distance (in radians)
    const distanceRandRad = Math.random() * distanceRad;

    // Calculate latitude of the nearby location
    const nearbyLatRad = Math.asin(
      Math.sin(centerLatRad) * Math.cos(distanceRandRad) +
        Math.cos(centerLatRad) *
          Math.sin(distanceRandRad) *
          Math.cos(bearingRad)
    );

    // Calculate longitude of the nearby location
    const nearbyLngRad =
      centerLngRad +
      Math.atan2(
        Math.sin(bearingRad) *
          Math.sin(distanceRandRad) *
          Math.cos(centerLatRad),
        Math.cos(distanceRandRad) -
          Math.sin(centerLatRad) * Math.sin(nearbyLatRad)
      );

    // Convert nearby location coordinates to degrees
    const nearbyLat = nearbyLatRad / DEG_TO_RAD;
    const nearbyLng = nearbyLngRad / DEG_TO_RAD;

    // Add the nearby location to the array
    locations.push({ lat: nearbyLat, lng: nearbyLng });
  }

  return locations;
}

/**
 * Rounds and splits a GPS coordinates string into latitude and longitude parts.
 *
 * @param {string} coordinates - The GPS coordinates string in the format "latitude, longitude".
 * @param {number} decimals - The number of decimal places to round to (default is 6).
 * @returns {string} Rounded coordinates as a string in the format "latitude, longitude".
 */
export function roundAndSplitCoordinates(coordinates: string, decimals = 6) {
  const [latitudeStr, longitudeStr] = coordinates
    .split(",")
    .map((coord) => parseFloat(coord));

  if (isNaN(latitudeStr) || isNaN(longitudeStr)) {
    throw new Error(
      'Invalid coordinates format. Please use "latitude, longitude".'
    );
  }

  const roundedLatitude = latitudeStr.toFixed(decimals);
  const roundedLongitude = longitudeStr.toFixed(decimals);

  return `${roundedLatitude}, ${roundedLongitude}`;
}
/* 

 * Reduces the given LatLngBounds by a specified distance in meters from the center.
 *
 * @param {google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral} bounds - The original bounds to be reduced.
 * @param {number} distanceMeters - The distance in meters by which to reduce the bounds.
 * @returns {google.maps.LatLngBounds} - The reduced bounds.
 
export function reduceBoundsByDistance(
  bounds: google.maps.LatLngBounds | google.maps.LatLngBoundsLiteral,
  distanceMeters: number
): google.maps.LatLngBounds {
  let center: google.maps.LatLng;

  if (bounds instanceof google.maps.LatLngBounds) {
    center = bounds.getCenter();
  } else {
    // Handle the case of google.maps.LatLngBoundsLiteral
    const centerLat = (bounds.north + bounds.south) / 2;
    const centerLng = (bounds.east + bounds.west) / 2;
    center = new google.maps.LatLng(centerLat, centerLng);
  }

  // Convert the distance from meters to latitude/longitude degrees
  const latLngDistance = distanceMeters / 111111; // Rough approximation

  // Calculate the new bounds by adjusting the center
  const newSouth = center.lat() - latLngDistance;
  const newWest = center.lng() - latLngDistance;
  const newNorth = center.lat() + latLngDistance;
  const newEast = center.lng() + latLngDistance;

  // Create and return the new bounds
  const newBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(newSouth, newWest),
    new google.maps.LatLng(newNorth, newEast)
  );

  console.log(JSON.stringify(newBounds.toJSON()));
  return newBounds;
}
 */

export function reduceBoundsByDistance(
  originalBounds: google.maps.LatLngBounds,
  distanceMeters: number
): google.maps.LatLngBounds {
  const SW = originalBounds.getSouthWest();
  const NE = originalBounds.getNorthEast();

  const latDiff =
    (NE.lat() - SW.lat()) * (distanceMeters / (2 * Math.PI * 6371000)); // 6371000 is Earth's radius in meters
  const lngDiff =
    (NE.lng() - SW.lng()) *
    ((distanceMeters / (2 * Math.PI * 6371000)) *
      Math.cos(((NE.lat() + SW.lat()) / 2) * (Math.PI / 180)));

  const newSW = new google.maps.LatLng(SW.lat() + latDiff, SW.lng() + lngDiff);
  const newNE = new google.maps.LatLng(NE.lat() - latDiff, NE.lng() - lngDiff);

  const newBounds = new google.maps.LatLngBounds(newSW, newNE);
  return newBounds;
}

export function reduceBoundsByDistanceAlternative(
  originalBounds: google.maps.LatLngBounds,
  distanceMeters: number
): google.maps.LatLngBounds {
  const SW = originalBounds.getSouthWest();
  const NE = originalBounds.getNorthEast();
  const center = originalBounds.getCenter();

  // Convert distance to degrees of latitude and longitude
  const latDiff = distanceMeters / 111320; // Approximate degrees of latitude per meter
  const lngDiff =
    distanceMeters / (111320 * Math.cos((center.lat() * Math.PI) / 180)); // Approximate degrees of longitude per meter

  // Shift the corners toward the center by the calculated differences
  const newSW = new google.maps.LatLng(SW.lat() + latDiff, SW.lng() + lngDiff);
  const newNE = new google.maps.LatLng(NE.lat() - latDiff, NE.lng() - lngDiff);

  const newBounds = new google.maps.LatLngBounds(newSW, newNE);
  return newBounds;
}

export function reduceBoundsByPercentage(
  originalBounds: google.maps.LatLngBounds,
  distanceMeters: number
): google.maps.LatLngBounds {
  const SW = originalBounds.getSouthWest();
  const NE = originalBounds.getNorthEast();
  const center = originalBounds.getCenter();

  // Convert distance to degrees of latitude and longitude
  const latDiff = distanceMeters / 111320; // Approximate degrees of latitude per meter
  const lngDiff =
    distanceMeters / (111320 * Math.cos((center.lat() * Math.PI) / 180)); // Approximate degrees of longitude per meter

  // Shift the corners toward the center by the calculated differences
  const newSW = new google.maps.LatLng(SW.lat() + latDiff, SW.lng() + lngDiff);
  const newNE = new google.maps.LatLng(NE.lat() - latDiff, NE.lng() - lngDiff);

  const newBounds = new google.maps.LatLngBounds(newSW, newNE);
  return newBounds;
}
