import { useState } from "react";
import { createChatroom } from "../api/chatromm.api";
import { FiMapPin, FiNavigation } from "react-icons/fi";
import { motion } from "framer-motion";
import { getUserLocation } from "../utlis/location";
import { geocodeCity } from "../utlis/geocodeCity";

function CreateChatroom() {
  const [name, setName] = useState("");
  const [radiusKm, setRadiusKm] = useState(2);
  const [city, setCity] = useState("");
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [locationSource, setLocationSource] = useState("");

  // 📍 GPS
  const fetchLocation = async () => {
    try {
      const loc = await getUserLocation();
      setLocation(loc);
      setLocationSource("gps");
    } catch {
      alert("Unable to fetch GPS location");
    }
  };

  // 🏙️ City → lat/lng
  const fetchCityLocation = async () => {
    if (!city.trim()) {
      alert("Please enter a city name");
      return;
    }

    try {
      const loc = await geocodeCity(city);
      setLocation({ lat: loc.lat, lng: loc.lng });
      setLocationSource("city");
    } catch {
      alert("City not found ❌");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!location) {
      alert("Please select a location (City or GPS)");
      return;
    }

    try {
      setLoading(true);

      await createChatroom({
        name,
        radiusKm,
        location,
      });

      alert("Chatroom created successfully ✅");
      window.location.href = "/chatrooms";
    } catch (error) {
      alert(error.response?.data?.message || "Failed to create chatroom");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto mt-16 p-6 bg-white rounded-2xl shadow-lg"
    >
      <h2 className="text-2xl font-bold text-indigo-600 mb-6">
        Create Chatroom
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <input
          type="text"
          placeholder="Chatroom name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded-lg"
        />

        {/* Radius */}
        <select
          value={radiusKm}
          onChange={(e) => setRadiusKm(Number(e.target.value))}
          className="w-full px-4 py-2 border rounded-lg"
        >
          <option value={2}>2 km radius</option>
          <option value={5}>5 km radius</option>
          <option value={10}>10 km radius</option>
        </select>

        {/* City */}
        <div className="relative">
          <FiMapPin className="absolute top-3 left-3 text-gray-400" />
          <input
            type="text"
            placeholder="Enter city (e.g. Chennai)"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full pl-10 px-4 py-2 border rounded-lg"
          />
        </div>

        <button
          type="button"
          onClick={fetchCityLocation}
          className="w-full py-2 border border-indigo-500 text-indigo-600 rounded-lg hover:bg-indigo-50"
        >
          Use City Location
        </button>

        <div className="text-center text-gray-400 text-sm">OR</div>

        {/* GPS */}
        <button
          type="button"
          onClick={fetchLocation}
          className="flex items-center justify-center gap-2 w-full py-2 border border-indigo-500 text-indigo-600 rounded-lg hover:bg-indigo-50"
        >
          <FiNavigation />
          Use my current location
        </button>

        {/* Status */}
        {location && (
          <p className="text-sm text-green-600">
            📍 Location set via {locationSource === "gps" ? "GPS" : "City"}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          {loading ? "Creating..." : "Create Chatroom"}
        </button>
      </form>
    </motion.div>
  );
}

export default CreateChatroom;
