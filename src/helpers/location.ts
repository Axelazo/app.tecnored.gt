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
