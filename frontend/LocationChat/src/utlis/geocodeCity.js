export const geocodeCity = async (city) => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
      city
    )}`
  );

  const data = await res.json();

  if (!data || data.length === 0) {
    throw new Error("City not found");
  }

  return {
    lat: Number(data[0].lat),
    lng: Number(data[0].lon),
    displayName: data[0].display_name,
  };
};
