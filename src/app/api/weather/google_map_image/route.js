import axios from "axios";
import { NextResponse } from "next/server";
export const POST = async (req) => {
  const { lat, lon } = await req.json();
  const api_key = process.env.GOOGLE_MAP_API_KEY;
  const latitude = lat;
  const longitude = lon;

  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=15&size=600x400&key=${api_key}&markers=color:red%7C${latitude},${longitude}`,
    { responseType: "arraybuffer" }
  );
  const base64String = Buffer.from(response.data, "binary").toString("base64");
  return NextResponse.json({
    map_image: `data:image/png;base64,${base64String}`,
  });
};
