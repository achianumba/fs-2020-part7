import axios from "axios";

export default async (credentials) =>
  await axios.post("/api/login", credentials);