"use client";
import LocationData from "@/components/location/Location";
import axios from "axios";
import { useState } from "react";
const Home = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [location_data, setLocationData] = useState(null);

  const fetchLocationData = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/weather", { location: text });
      const data = await response.data;
      setLocationData(data);
      setLoading(false);
    } catch (error) {
      setLocationData([]);
      setLoading(false);
    }
  };
  return (
    <div className="grid h-screen place-content-center">
      <div className="space-y-2 flex justify-center flex-col   mx-auto mb-4">
        <label
          htmlFor="text"
          className="font-roboto font-semibold block text-center"
        >
          {" "}
          Enter your location here
        </label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="p-2 rounded-md font-roboto placeholder:font-roboto font-semibold text-gray-700 ring-2 ring-lime-700"
          placeholder="Enter your text"
          autoComplete="on"
        />

        <div className="my-4 text-center">
          <button
            className="font-roboto font-semibold bg-green-800 text-white p-2 rounded-md"
            onClick={fetchLocationData}
          >
            Fetch Location Data
          </button>
        </div>
      </div>

      {loading && (
        <h1 className="font-roboto text-2xl font-semibold">Loading...</h1>
      )}

      {location_data ? <LocationData location_data={location_data} /> : null}
    </div>
  );
};

export default Home;
