import axios from "axios";

export const POST = async (req) => {
  const { location } = await req.json();
  const res = await axios.get(
    `http://api.weatherapi.com/v1/current.json?key=083015e2d8234fef9a0151324242612&q=${location}&aqi=no`
  );
  const data = await res.data;
  return new Response(JSON.stringify(data));
};
