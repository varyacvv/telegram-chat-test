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

export const sendMessage = async (
  idInstance,
  apiTokenInstance,
  chatId,
  message,
) => {
  const payload = {
    chatId: chatId,
    message: message,
  };

  const response = await api.post(
    `/waInstance${idInstance}/sendMessage/${apiTokenInstance}`,
    payload,
  );

  return response.data;
};

export const receiveNotification = async (idInstance, apiTokenInstance) => {
  const response = await api.get(
    `/waInstance${idInstance}/receiveNotification/${apiTokenInstance}`,
  );
  return response.data;
};

export const deleteNotification = async (
  idInstance,
  apiTokenInstance,
  receiptId,
) => {
  const response = await api.delete(
    `/waInstance${idInstance}/deleteNotification/${apiTokenInstance}/${receiptId}`,
  );
  return response.data;
};
