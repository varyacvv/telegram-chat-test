import axios from "axios";

const BASE_URL = "https://api.green-api.com";

const api = axios.create({
  baseURL: BASE_URL,
});

export const checkAuth = async (idInstance, apiTokenInstance) => {
  const response = await api.get(
    `/waInstance${idInstance}/getSettings/${apiTokenInstance}`,
  );
  return response.data;
};
