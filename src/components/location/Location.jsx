"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
const Location = ({ location_data }) => {
  const [googleImage, setGoogleImage] = useState("");
  const { current, location } = location_data;

  const fetchGoogleImage = async () => {
    const { lat, lon } = location;
    const response = await axios.post("/api/weather/google_map_image", {
      lat,
      lon,
    });
    const data = await response.data;
    setGoogleImage(data.map_image);
  };

  useEffect(() => {
    fetchGoogleImage();

    console.log("reloading now");
  }, [location]);
  return (
    <div className="grid grid-cols-2">
      <div className="left_side border-2 flex items-center py-8 flex-wrap flex-col">
        <p className="font-roboto">
          Temp: <b className="font-bold text-red-900"> {current?.temp_c}</b>{" "}
          Degree Celsius
        </p>
        <p className="font-roboto">Region Name : {location?.region}</p>
        <p className="font-roboto">Country Name : {location?.country}</p>
      </div>
      <div className="right-side border-2">
        <div className="">
          {googleImage && (
            <Image
              src={googleImage}
              className="w-full h-full"
              width={500}
              height={500}
              alt="Google Image"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Location;
